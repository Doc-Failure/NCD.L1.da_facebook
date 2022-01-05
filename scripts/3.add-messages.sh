#!/usr/bin/env bash

#
set -e

PROFILE_ID=$RANDOM

echo
echo
echo --------------------------------------------------------------------
echo "Step 0: Add a new Profile"
echo ---------------------------------------------------------

near call $CONTRACT createProfile '{"_userName": "Micky Mouse","_age":16,"_publicDescription":"string","_profileId":"address-'$PROFILE_ID'"}' --account-id $USER_ACCOUNT


echo
echo
echo --------------------------------------------------------------------
echo "Step 1: Add a new Message"
echo ---------------------------------------------------------

near call $CONTRACT addMessage '{"receiver": "address-'$PROFILE_ID'", "message": "A Random message"}' --account-id $USER_ACCOUNT

echo
echo
echo --------------------------------------------------------------------
echo "Step 2: all the saved profiles"
echo ---------------------------------------------------------
near call $CONTRACT getMessages '{"receiver": "address-'$PROFILE_ID'"}' --account-id $USER_ACCOUNT

echo
exit 0