@echo off

echo Reverting WSL port forwarding and firewall rules for Mother's Day Game...

REM Remove port forwarding rule
netsh interface portproxy delete v4tov4 listenport=8000 listenaddress=0.0.0.0

REM Remove firewall rule
netsh advfirewall firewall delete rule name="WSL Game Server"

echo.
echo Revert complete! The port forwarding and firewall rule have been removed.
echo Press any key to exit...
pause >nul 