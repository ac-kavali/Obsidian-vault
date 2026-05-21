
#  Mastering Python with UV

> **UV** is a blazingly fast Python package and project manager built in Rust. It replaces `pip`, `virtualenv`, `pyenv`, and `requirements.txt` with one unified tool.

---

## 1. Core Philosophy & Architecture

|Tool Replaced|UV Equivalent|
|---|---|
|`pip`|`uv add` / `uv pip install`|
|`virtualenv` / `venv`|`uv venv` (auto-managed)|
|`pyenv`|`uv python install`|
|`requirements.txt`|`pyproject.toml` + `uv.lock`|

**Why UV?**

- **Speed** — Resolves dependencies in milliseconds (Rust-powered)
- **Reproducibility** — `uv.lock` guarantees identical environments everywhere
- **Auto-management** — Handles `.venv` transparently behind the scenes

---

## 2.The Golden Workflow (New Project Setup)

> ⚠️ **Always follow this exact order** to avoid environment pollution.

```bash
# Step 1 — Initialize project (creates pyproject.toml + structure)
uv init my-project
cd my-project

# Step 2 — Explicitly create .venv IN the current folder
uv venv

# Step 3 — Install all dependencies from pyproject.toml
uv sync

# Step 4 — Run your script (auto-detects local .venv, no activation needed)
uv run main.py
```

> `uv init` is the **true first step** — it scaffolds `pyproject.toml`, `README.md`, and `main.py` automatically.

---

## 3.Everyday Commands Cheat Sheet

### Managing Packages

```bash
# Add a package (updates pyproject.toml + uv.lock automatically)
uv add pydantic

# Add a package with a specific version constraint
uv add "fastapi>=0.100"

# CORRECT way to remove a package
uv remove pydantic

# List all installed packages in .venv
uv pip list
```

> ❌ **Don't** manually edit `dependencies = []` in `pyproject.toml` to remove packages — use `uv remove` instead.

### Synchronization

```bash
# Sync everything (dev + prod) — use locally
uv sync

# Sync ONLY production packages — use in CI/CD and servers
uv sync --no-dev

# Sync without updating the lockfile (strict reproducibility)
uv sync --frozen
```

`uv sync` compares `pyproject.toml` _(Intent)_ with `.venv` _(State)_ → installs missing, uninstalls removed.

### Running Scripts

```bash
# Run using local .venv (recommended)
uv run main.py

# Run with an extra package without adding it to the project
uv run --with requests main.py
```

---

## 4.Python Version Management

> UV can replace `pyenv` entirely.

```bash
# Install a specific Python version
uv python install 3.12

# Install multiple versions
uv python install 3.11 3.12 3.13

# List all available/installed versions
uv python list

# Create a venv with a specific Python version
uv venv --python 3.12

# Pin the Python version for the project (creates .python-version file)
uv python pin 3.12
```

> The `.python-version` file is read automatically by `uv` — commit it to Git so all teammates use the same Python version.

---

## 5.Configuration Files

### `pyproject.toml` — The purpose

```toml
[project]
name = "my-project"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = [
    "pydantic>=2.0",
    "fastapi>=0.100",
]
```

- Human-readable — **you edit this**
- `requires-python` — strictly enforces minimum Python version
- `dependencies` — packages required to run the project

### `uv.lock` — The Exact Truth

- Machine-generated — **never edit manually**
- Locks every package + sub-dependency to an exact version + cryptographic hash
- **Always commit to Git** — guarantees "works on my machine" = works everywhere

---

## 6.Advanced: Monorepos & Local Path Dependencies

For complex architectures where a root project depends on a local sub-package:

```toml
# Root pyproject.toml
[project]
dependencies = ["llm-sdk"]

[tool.uv.sources]
llm-sdk = { path = "llm_sdk", editable = true }
```

UV will automatically navigate into `llm_sdk/`, read its `pyproject.toml`, and install its dependencies (like `transformers`) into the **single shared root `.venv`**.

---

## 7.Editable Mode (Dev vs. Prod)

|Mode|How it works|Use case|
|---|---|---|
|`editable = true`|Creates a **symlink** → changes are instant|Local development|
|`editable = false`|Creates a **physical copy** (snapshot)|Production / deployment|

---

## 8.Dependency Groups (Separating Dev from Prod)

```toml
[dependency-groups]
dev = ["flake8", "mypy", "pytest"]
```

```bash
# Install everything (dev + prod) — for local development
uv sync

# Install ONLY production packages — for CI/CD and servers
uv sync --no-dev
```

---

## 9.UV Tools (`uvx`) — Like `pipx`

> Run CLI tools **without installing them into your project**.

```bash
# Run a tool once without installing it
uvx ruff check .
uvx black .

# Install a tool globally (accessible anywhere)
uv tool install ruff

# List globally installed tools
uv tool list
```

> 💡 Use `uvx` for linters, formatters, and one-off CLI tools. Use `uv add --dev` for tools that need to be in the project lockfile.