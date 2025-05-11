@echo off
echo Setting up WSL port forwarding for Mother's Day Game...

REM Get WSL IP address
for /f "tokens=*" %%a in ('wsl hostname -I') do set WSL_IP=%%a

REM Remove existing port forwarding if any
netsh interface portproxy delete v4tov4 listenport=8000 listenaddress=0.0.0.0

REM Add new port forwarding
netsh interface portproxy add v4tov4 listenport=8000 listenaddress=0.0.0.0 connectport=8000 connectaddress=%WSL_IP%

REM Add firewall rule
netsh advfirewall firewall delete rule name="WSL Game Server" >nul 2>&1
netsh advfirewall firewall add rule name="WSL Game Server" dir=in action=allow protocol=TCP localport=8000

echo.
echo Setup complete! The game should now be accessible from other devices on your network.
echo.
echo To find your Windows IP address (for other devices to connect):
ipconfig | findstr IPv4
echo.
echo Press any key to exit...
pause >nul 