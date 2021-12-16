# `DA_FACEBOOK` Starter Kit

# 📄 Introduction

Decentralized Facebook Clone.
The idea is really simple.
Every address can create a profile.
Every profile can share a comment on the feed of another profile. All the feedd are public.
The project can be improved by using IPFS as a filesystem to store profile pictures.

In the project you can

1. Create a profile
2. Get the list of all the profiles.
3. Get one single profile.
4. Send a message to the feed of a profile.
5. retrieve all the messages of a profile.
6. Get and Set Enviroment variables

# 📦 Installation

To run this project locally you need to follow the next steps:

## Step 1: Prerequisites

1. Make sure you've installed [Node.js] ≥ 12 (we recommend use [nvm])
2. Make sure you've installed yarn: `npm install -g yarn`
3. Install dependencies: `yarn install`
4. Create a test near account [NEAR test account]
5. Install the NEAR CLI globally: [near-cli] is a command line interface (CLI) for interacting with the NEAR blockchain

   yarn install --global near-cli

## Step 2: Configure your NEAR CLI

Configure your near-cli to authorize your test account recently created:

    near login

## Step 3: Build and make a smart contract development deploy

Build the smart contract code and deploy the local development server: `yarn build:release` (see `package.json` for a full list of `scripts` you can run with `yarn`). This script return to you a provisional smart contract deployed (save it to use later). You can also follow the instructions on the folder _scripts_.

# 📑 Exploring the smart contract methods

The following commands allow you to interact with the smart contract methods using the NEAR CLI (for this you need to have a provisional smart contract deployed).

## Command to create a profile:

```bash
near call $CONTRACT createProfile '{"_userName": "string","_age":number,"_publicDescription":"string","_profileId":"string"}' --account-id $USER_ACCOUNT
```

## Command to get all the profiles:

```bash
near call $CONTRACT getProfiles --account-id $USER_ACCOUNT
```

## Command to get a specific profile:

```bash
near call $CONTRACT getProfile '{"_profileId": "string"}' --account-id $USER_ACCOUNT
```

**Thing that we can add in the future**

## Command to add a Message:

```bash
 near call $CONTRACT createProfile '{"_userName": "string","_age":number,"_publicDescription":"string","_profileId":"string"}' --account-id $USER_ACCOUNT
```

## Command to get all the messages of a profile:

```bash
 near call $CONTRACT getMessage '{"receiver": "string"}' --account-id $USER_ACCOUNT
```
