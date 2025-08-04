This is conceptually simple, but getting everything right is incredibly tedious, and even when you do, it will take a _long_ time to train. I wish I'd just paid FAL or Replicate to do it instead. Alas, I did it, and here are my rough notes.

Clone [sd-scripts](https://github.com/kohya-ss/sd-scripts) somewhere where you have GPU compute, preferably with at least 24GB of VRAM. You can do this with less, but it probably involves more pain. Check out the `sd3` branch.

Create a folder for your dataset (hereby assumed to be `dataset`) in `sd-scripts`, then resize your images such that their longest axis is 1024 pixels, and ensure that each axis is a power of 2. I recommend 1024x1024, 1024x512, and 512x1024. You will run into problems if you do not do this. Bucket the images by their resolution, so that you have `dataset/1024x1024`, etc.

For each image, create a text file of the same filename and the extension `txt`. In these text files, insert a detailed caption of the image, describing everything that you _don't_ want to be captured in the LoRA; that is, for a subject LoRA, describe the style, and for a style LoRA, describe the subject.

Produce a `config.toml` in `dataset` to describe the contents of your dataset; this will be used by the training script. `image_dir` is relative to the working directory, which will be the root of `sd-scripts`.

You can tweak the `batch_size` for each dataset based on the available VRAM you have; try higher values and work down until it stops crashing from lack of VRAM.
Tweaking `num_repeats` is also recommended; the more repeats you have, the more likely it is the LoRA will pick up the qualities you're trying to train, but you may also run the risk of overtraining it. This will also increase the training length.

```toml
[general]
shuffle_caption = false
caption_extension = '.txt'
keep_tokens = 1

[[datasets]]
resolution = [1024, 512]
batch_size = 2
num_repeats = 10

[[datasets.subsets]]
image_dir = "dataset/1024x512"

[[datasets]]
resolution = [512, 1024]
batch_size = 2
num_repeats = 10

[[datasets.subsets]]
image_dir = "dataset/512x1024"

[[datasets]]
resolution = [1024, 1024]
batch_size = 2
num_repeats = 10

[[datasets.subsets]]
image_dir = "dataset/1024x1024"
```

Hop into the following NixOS shell. This doesn't include everything, probably, it's overlaid atop my system's dependencies:

```nix
{ pkgs ? import <nixpkgs> {} }:

(pkgs.buildFHSEnv {
  name = "cuda-env";
  targetPkgs = pkgs: with pkgs; [
    mesa
    libGL
    stdenv.cc.cc.lib
    glib
    cudaPackages.cudatoolkit
    cudaPackages.cudnn
    linuxPackages.nvidia_x11
    glibc
    binutils
    python3
    python3.pkgs.python
    python3Packages.pip
    python3Packages.setuptools
    python3Packages.wheel
  ];
  runScript = "bash";
  profile = ''
    export LD_LIBRARY_PATH="${pkgs.stdenv.cc.cc.lib}/lib:${pkgs.mesa}/lib:${pkgs.libGL}/lib:${pkgs.glib.out}/lib:${pkgs.cudaPackages.cudatoolkit}/lib:${pkgs.cudaPackages.cudnn}/lib:${pkgs.linuxPackages.nvidia_x11}/lib:$LD_LIBRARY_PATH"
    export CUDA_PATH="${pkgs.cudaPackages.cudatoolkit}"
    export CUDA_ROOT="${pkgs.cudaPackages.cudatoolkit}"
    export CUDA_HOME="${pkgs.cudaPackages.cudatoolkit}"
    export CUDNN_PATH="${pkgs.cudaPackages.cudnn}"
    export PATH="${pkgs.cudaPackages.cudatoolkit}/bin:$PATH"
    export C_INCLUDE_PATH="${pkgs.python3}/include/python${pkgs.python3.pythonVersion}:$C_INCLUDE_PATH"
    export CPLUS_INCLUDE_PATH="${pkgs.python3}/include/python${pkgs.python3.pythonVersion}:$CPLUS_INCLUDE_PATH"
    export PKG_CONFIG_PATH="${pkgs.python3}/lib/pkgconfig:$PKG_CONFIG_PATH"
  '';
}).env
```

(Yes, setting up an environment with all of the necessary dependencies and paths is a pain in the arse. It's where much of my time went. Thank you for making this viable, Claude.)

Once you're in the shell, run `accelerate config` to configure Hugging Face Accelerate. You can ostensibly use multi-GPU here, but in practice, I wasted many hours debugging crashes and resorted to using a single GPU with a reduced batch size. For reference, I have two heterogeneous RTX 3090s; maybe it'd work better with a homogeneous configuration from the same manufacturer? Not finding out any time soon, unfortunately!

Download the following models for FLUX.1-dev if you don't have them already; I stored them in my ComfyUI directory for easy access. I used the following; note that both FLUX and the T5-XXL encoder are FP8, which help with VRAM, but might degrade the quality of your LoRA. At some point, I might try retraining my LoRA with 16-bit to see if it improves the output quality.

- <https://huggingface.co/Kijai/flux-fp8/resolve/main/flux1-dev-fp8.safetensors>
- <https://huggingface.co/camenduru/FLUX.1-dev/resolve/main/ae.safetensors> (rename to match config)
- <https://huggingface.co/camenduru/FLUX.1-dev/resolve/main/clip_l.safetensors>
- <https://huggingface.co/camenduru/FLUX.1-dev/resolve/main/t5xxl_fp8_e4m3fn.safetensors>

Go to `sd-scripts`, and then proceed to do the usual Python bullshit:

- `python -m venv .venv`
- `. .venv/bin/activate`
- `pip install -r requirements.txt`
- `pip install torch==2.4.0 torchvision==0.19.0 --index-url https://download.pytorch.org/whl/cu124`

You may be tempted to use `uv` to minimise your exposure to Python bullshit, but having been down that path, I do not advise it; `accelerate` interacts strangely with `uv`'s `venv`, and you're much more likely to get the script actually running if you do it the normal Python way.

Before you continue, you may want to do a quick sanity check:

```
$ python3
Python 3.12.11 (main, Jun  3 2025, 15:41:47) [GCC 14.2.1 20250322] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import torch
>>> torch.cuda.is_available()
True
```

If you do not see `True`, God help you and good luck. The above shell _should_ work for getting you to a valid Python+CUDA-on-NixOS environment, but with a stack that's this brittle, who knows?

Once you're good to go, you can run the training command. Consider tweaking:

- `network_dim`: "Higher values increase expressiveness but also increase file size and computational cost. Values between 4 and 128 are commonly used. There is no default (module dependent)."
- `learning_rate`: "For LoRA training (when alpha value is 1), relatively higher values (e.g., from 1e-4 to 1e-3) are often used."
- `max_train_epochs`: the number of times the training process will loop over the dataset. Similar kind of caveats to `num_repeats` above applies.
- `save_every_n_epochs`: ostensibly makes it possible to resume the process after failure from a checkpoint. haven't figured out how, but it is a great chance to give your GPU a breather
- `dataset_config` / `output_dir` / `output_name`: self-explanatory

```sh
accelerate launch \
    --mixed_precision bf16 \
    --num_cpu_threads_per_process 1 \
    flux_train_network.py \
    --pretrained_model_name_or_path ../ComfyUI/models/checkpoints/flux1-dev-fp8.safetensors \
    --clip_l ../ComfyUI/models/text_encoders/clip_l.safetensors \
    --t5xxl ../ComfyUI/models/text_encoders/t5xxl_fp8_e4m3fn.safetensors \
    --ae ../ComfyUI/models/vae/flux1_ae.safetensors \
    --cache_latents_to_disk \
    --save_model_as safetensors \
    --sdpa \
    --persistent_data_loader_workers \
    --max_data_loader_n_workers 2 \
    --seed 42 \
    --gradient_checkpointing \
    --mixed_precision bf16 \
    --save_precision bf16 \
    --network_module networks.lora_flux \
    --network_dim 4 \
    --network_train_unet_only \
    --optimizer_type adamw8bit \
    --learning_rate 1e-4 \
    --cache_text_encoder_outputs \
    --cache_text_encoder_outputs_to_disk \
    --fp8_base \
    --highvram \
    --max_train_epochs 16 \
    --save_every_n_epochs 4 \
    --dataset_config dataset/config.toml \
    --output_dir dataset \
    --output_name dataset \
    --timestep_sampling shift \
    --discrete_flow_shift 3.1582 \
    --model_prediction_type raw \
    --guidance_scale 1.0
```
