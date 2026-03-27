## Vmware fixed Resolution
1. Ensure that the stetch and full screen enabled like this:
![[kali-problem.jpg|447]]

2. Ensure that monitor screen like this :  
![[latest.jpg|459]]

3. use those command to reset the vmware modules :
```sh
sudo apt purge open-vm-tools*
sudo apt install open-vm-tools open-vm-tools-desktop
reboot
```
