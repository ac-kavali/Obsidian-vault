the password policies you should enter to the file /etc/login.defs and change M to 30 ,m to 2 and W 7 
this is will applied just to new users to set this to current user you should  manually use the command sudo chage -m -M -W username 
and you should install libpam-pwquality

/etc/login.defs 
/etc/pam.d