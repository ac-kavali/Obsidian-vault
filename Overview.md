<span style="color:rgb(255, 192, 0)">awk</span> -v n="$var" <span style="color:rgb(0, 176, 80)">'NR==12'</span>

- just 4 primary partitions 
- limit desk size to 2tb
- work with the bios


<span style="color:rgb(255, 192, 0)">for</span> arg <span style="color:rgb(255, 192, 0)">in</span> "\$@"; <span style="color:rgb(255, 192, 0)">do</span>  
<span style="color:rgb(0, 176, 80)">echo</span> "Argument: <span style="color:rgb(0, 176, 240)">$arg</span>"  
<span style="color:rgb(255, 192, 0)">done</span>

- `$1` → first argument
- `$2` → second argument
- `$3` → third argument
- `$@` → all arguments
- `$#` → number of arguments