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
# copyTo="./widgets_built"
tempCopy="./widgets"
# Log file
logFile="$HOME/widget_build.log"
echo $(date) >> $logFile
# Colors!
green='\E[32m'
red='\E[31m'
normal='\E[m'
# Directory configuration
declare -A directories
directories=(["w_crime"]="realestate" ["w_demographics"]="realestate" ["w_finance"]="finance" ["w_hoopsloyal"]="sports" ["w_political"]="realestate" ["w_realestate"]="realestate" ["w_sports"]="sports" ["w_weather"]="realestate" ["dynamic_widget"]="dynamic_widget")

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
echo -en "[....] Copying Public and Fonts Folders\r"
if cp -r ./css/font ./css/public $tempCopy/css; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 1
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
echo -en "[....] Creating target directory (dynamic)\r"
if mkdir -p $tempCopy/dynamic_widget >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
for d in "${!directories[@]}"; do
  echo -en "[....] Copying $d\r"
  for f in $(ls ./$d | grep html); do
    if ! cp ./$d/$f $tempCopy/${directories[$d]}/$f >>$logFile 2>&1; then
      echo -e "[${red}ERR.${normal}]"
      exit 0
    fi
  done
  echo -e "[${green}DONE${normal}]"
done
echo

# Change all the links to minified files
echo "**** Changing Link Locations ****"
widgets=('finance' 'realestate' 'sports' 'dynamic_widget');
for w in ${widgets[@]}; do
  echo -en "[....] $w Widgets\r"
  for f in $(ls $tempCopy/$w | grep html); do
    # CSS
    if ! sed -i 's/\.\.\/css\/\(.*\)\.css/\.\.\/css\/\1\.min\.css/g' $tempCopy/$w/$f; then
      echo -e "[${red}ERR.${normal}]"
      exit 1;
    fi
    # JS
    if ! sed -i 's/\.\.\/js\/\(.*\)\.js/\.\.\/js\/\1\.min\.js/g' $tempCopy/$w/$f; then
      echo -e "[${red}ERR.${normal}]"
      exit 1;
    fi
  done
  echo -e "[${green}DONE${normal}]"
done
echo

# Copy the temp directory to the deploy directory
echo "**** Deploying ****"
echo -en "[....] Removing old files\r"
if rm -rf $copyTo/* >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
echo -en "[....] Deploying files\r"
if mv -f "$tempCopy/"* "$copyTo" >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
echo -en "[....] Removing temporary directory\r"
if rm -rf $tempCopy >>$logFile 2>&1; then
  echo -e "[${green}DONE${normal}]"
else
  echo -e "[${red}ERR.${normal}]"
  exit 0;
fi
exit 1
