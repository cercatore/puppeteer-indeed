@echo off
"C:\Program Files\WinRAR\winrar.exe" a -afzip -s -m5 -r blabla.zip .   -x/node_modules 

@echo on

scp -i %USERPROFILE%\desktop\sshtunn\aws-console\claudio_boeba.pem blabla.zip ubuntu@rairadio.app:~/gbud.zip
