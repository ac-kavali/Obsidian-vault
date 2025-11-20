`ft_putnbr` : handle the number `%d`

parse format: 

```c
% [flags] [width] [.precision] [specifier]
```
# note for each flag :

| Flag            | Meaning                                 | Affects                                                                  |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| `-`             | Left-align within given width           | All types (but no effect if shorter than width)                          |
| `+`             | Show `+` for positive numbers           | Only `%d` and `%i`                                                       |
| (space)         | Print a space instead of `+` if no sign | Only `%d` and `%i`                                                       |
| `0`             | Pad with zeros on the left              | `%d`, `%i`, `%u`, `%x`, `%X`, `%c`, `%%` (ignored if `-` or `.` present) |
| `#`             | Add `0x` / `0X` prefix                  | `%x`, `%X` only                                                          |
| `.` (precision) | Controls number of digits or max chars  | `%d`, `%i`, `%u`, `%x`, `%X` (min digits), `%s` (max chars)              |
| width           | Minimum field width                     | All types                                                                |
## Quick reminder:
### **Quick reminders**
- `0` flag is **ignored if precision is specified** for numbers.
- For `%s`, precision means **maximum characters printed**.
- For `%d`, `%i`, `%u`, `%x`, `%X`, precision means **minimum number of digits** (add leading zeros if needed). 
- `%p` always prints `0x` prefix (like `#` flag).
- `+` overrides space flag if both are present.

---
##  🅒 `%c` — Character

| Feature         | Supported | Notes                                        |
| --------------- | --------- | -------------------------------------------- |
| `-`             | ✅         | Left-align the character within width        |
| `+`             | ❌         | No effect                                    |
| (space)         | ❌         | No effect                                    |
| `0`             | ❌         | Pads with zeros if width > 1 (rarely useful) |
| `#`             | ❌         | No effect                                    |
| `.` (precision) | ❌         | Ignored                                      |
| **width**       | ✅         | Minimum total width                          |

---
## 🅢 `%s` — String

| Feature         | Supported | Notes                           |
| --------------- | --------- | ------------------------------- |
| `-`             | ✅         | Left-align string               |
| `+`             | ❌         | No effect                       |
| (space)         | ❌         | No effect                       |
| `0`             | ❌         | Ignored (use spaces only)       |
| `#`             | ❌         | No effect                       |
| `.` (precision) | ✅         | Maximum number of chars printed |
| **width**       | ✅         | Minimum total width             |

---
## 🅓  `%d` & `%i` — Signed Integer

| Feature         | Supported | Notes                                 |
| --------------- | --------- | ------------------------------------- |
| `-`             | ✅         | Left-align number                     |
| `+`             | ✅         | Always show `+` for positive numbers  |
| (space)         | ✅         | Print space instead of `+` if no sign |
| `0`             | ✅         | Pad with zeros if no `-` or precision |
| `#`             | ❌         | No effect                             |
| `.` (precision) | ✅         | Minimum digits (adds leading zeros)   |
| **width**       | ✅         | Minimum total width                   |

---
## 🅤 `%u` — Unsigned Integer

| Feature         | Supported | Notes                                 |
| --------------- | --------- | ------------------------------------- |
| `-`             | ✅         | Left-align                            |
| `+`             | ❌         | No effect                             |
| (space)         | ❌         | No effect                             |
| `0`             | ✅         | Pad with zeros if no `-` or precision |
| `#`             | ❌         | No effect                             |
| `.` (precision) | ✅         | Minimum digits (adds zeros)           |
| **width**       | ✅         | Minimum total width                   |

---
## 🆇 `%x` — Hexadecimal (lowercase)

| Feature         | Supported | Notes                                 |
| --------------- | --------- | ------------------------------------- |
| `-`             | ✅         | Left-align                            |
| `+`             | ❌         | No effect                             |
| (space)         | ❌         | No effect                             |
| `0`             | ✅         | Pad with zeros if no `-` or precision |
| `#`             | ✅         | Add `0x` prefix if non-zero           |
| `.` (precision) | ✅         | Minimum digits (adds zeros)           |
| **width**       | ✅         | Minimum total width                   |

---
## 🆇 `%X` — Hexadecimal (uppercase)

| Feature         | Supported | Notes                                 |
| --------------- | --------- | ------------------------------------- |
| `-`             | ✅         | Left-align                            |
| `+`             | ❌         | No effect                             |
| (space)         | ❌         | No effect                             |
| `0`             | ✅         | Pad with zeros if no `-` or precision |
| `#`             | ✅         | Add `0X` prefix if non-zero           |
| `.` (precision) | ✅         | Minimum digits (adds zeros)           |
| **width**       | ✅         | Minimum total width                   |

---

## 🅟 `%` — Literal Percent Sign

| Feature         | Supported | Notes                                  |
| --------------- | --------- | -------------------------------------- |
| `-`             | ✅         | Left-align `%` within width            |
| `+`             | ❌         | No effect                              |
| (space)         | ❌         | No effect                              |
| `0`             | ✅         | Pad with zeros if width > 1 and no `-` |
| `#`             | ❌         | No effect                              |
| `.` (precision) | ❌         | Ignored                                |
| **width**       | ✅         | Minimum total width                    |

---
 