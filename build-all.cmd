@echo off
@cls
echo Build all CMD
ng build --project=ngm-ui 
npm install dist/ngm-ui --save-optional
ng build --project=demo
rem ng serve --project=demo

