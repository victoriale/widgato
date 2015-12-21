#!/bin/bash
##############################################
# This script deploys and minifies the widget code
# Script does not minify HTML
# Dependencies:
#   npm
#   minifier (node module)
##############################################

# Set variables
# target directory
copyTo="/var/www/content.synapsys.us/public_html/widgets"
copyTo="./Done"
tempCopy="./Minified"
# Log file
logFile="$HOME/widget_build.log"
echo $(date) >> $logFile
# Colors!
green='\E[32m'
red='\E[31m'
normal='\E[m'
# Directory configuration
directories=("w_crime" "w_demographics" "w_finance" "w_hoopsloyal" "w_political" "w_realestate" "w_sports" "w_weather")
categories=(["w_crime"]="realestate" ["w_demographics"]="realestate" ["w_finance"]="finance" ["w_hoopsloyal"]="sports" ["w_political"]="realestate" ["w_realestate"]="realestate" ["w_sports"]="sports" ["w_weather"]="realestate")

# Check for the Dependencies
# minify
command -v minify >>$logFile 2>&1 || { echo -e >&2 "minify is required to run this script. Install it with:\nnpm install -g minify\n\nExiting with error"; exit 0; }

# minify the JS folder
echo "**** Javascript ****"
# Minify
echo -en "[....] Minifying JS Folder\r"
if minify js >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
# Create move to directory (if doesn't exist)
echo -en "[....] Checking new directory\r"
if mkdir -p $tempCopy/js >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
# Move JS files
echo -en "[....] Moving minified JS files\r"
if mv js/*.min.js $tempCopy/js >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
echo -en "[....] Deleting unused minified JS files\r"
if rm js/*/*.min.js >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
echo

# minify and move the CS folder
echo "**** CSS ****"
# Minify
echo -en "[....] Minifying CSS Folder\r"
if minify css >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
# Create move to directory (if doesn't exist)
echo -en "[....] Checking new directory\r"
if mkdir -p $tempCopy/css >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
# Move JS files
echo -en "[....] Moving minified CSS files\r"
if mv css/*.min.css $tempCopy/css >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
echo -en "[....] Deleting unused minified CSS files\r"
if rm css/*/*.min.css >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
echo

# move the HTML files
echo "**** HTML ****"
echo -en "[....] Creating target directory (realestate)\r"
if mkdir -p $tempCopy/realestate >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
echo -en "[....] Creating target directory (finance)\r"
if mkdir -p $tempCopy/finance >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
echo -en "[....] Creating target directory (sports)\r"
if mkdir -p $tempCopy/sports >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
for d in ${directories[@]}; do
  echo -en "[....] Copying $d\r"
  for f in $(ls ./$d | grep html); do
    if ! cp ./$d/$f $tempCopy/${categories[$d]}/$f >>$logFile 2>&1; then
      echo -e "[${red}ERR.${normal}]"
      exit 0
    fi
  done
  echo -e "[${green}DONE${normal}]"
done

# Copy the temp directory to the deploy directory
echo -en "[....] Deploying files\r"
if mv "$tempCopy" "$copyTo"; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
exit 1
