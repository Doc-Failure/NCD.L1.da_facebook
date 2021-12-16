#!/usr/bin/env bash

#
set -e


echo "Please export $USER_ACCOUNT before to use this script"
echo "export USER_ACCOUNT=<your_near_account_name>"
echo
echo
echo ---------------------------------------------------------
echo "Step 0: Set the varable isProduction to false"
echo
echo ---------------------------------------------------------
echo
echo

near call $CONTRACT setProduction '{"_isProduction":false}' --account-id $USER_ACCOUNT

echo
echo
echo --------------------------------------------------------------------
echo "Step 1: Add a new Profile"
echo ---------------------------------------------------------

near call $CONTRACT createProfile '{"_userName": "Micky Mouse","_age":16,"_publicDescription":"string","_profileId":"address-'$RANDOM'"}' --account-id $USER_ACCOUNT

echo
echo
echo --------------------------------------------------------------------
echo "Step 2: Let's show all the saved profiles"
echo ---------------------------------------------------------
near call $CONTRACT getProfiles --account-id $USER_ACCOUNT 

echo
exit 0