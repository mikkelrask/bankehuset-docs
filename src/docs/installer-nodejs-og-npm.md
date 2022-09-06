---
title: 'Installer NodeJS på Oracle Cloud/Oracle Linux'
metaTitle: 'What is even "LTS"?'
metaDescription: 'Guide til at installere den seneste version af NodeJS på dit gratis Oracle Cloud VM instance'
---
## NodeJS & NPM

Uanset om du skal build en Webapp eller lave en JS backend, er NodeJS *ze way to go*.
NPM åbner op for millioner af open source biblioteker der kan udvide ethvert projekts funktionalitet.
Her gå vi igennem hvordan du kommer godt i gang 🎉

## Hvad skal vi?

* [x] Hent seneste NodeJS tarball
* [x] Kopier binary filer til /usr/local/xxx
* [x] Fix NPM permissions
* [x] Test for sucsess

## Hent den seneste version

Hvis du har Oracle Clouds Always Free Tier Ampere CPU's er det en ARM processor der styrer skibet, og Oracle's mirrors er *så* "LTS" at den installerede udgave af NodeJS, som distroen kommer med, er version 10.x.x i skrivende stund. Den seneste supportede LTS udgave er 16.17.0 pt, og til mit formål skal jeg have version 18.8.0. 

# TL;DR
Find seneste versions link på [nodejs.org/en/download/current](http://nodejs.org/en/download/current)

![Højreklik på linket til den version du skal bruge, og vælg "Kopier Link" eller lign.](.attachments.28531/2022-08-30_13-33.png) 

**Hent NodeJS tarball**

```
wget -O NODE.tar.xz "https://nodejs.org/dist/v18.8.0/node-v18.8.0-linux-arm64.tar.xz"
```

**Fjern tudsegamle NodeJS**
```
sudo dnf remove nodejs
```

**Pak filen ud**
```
tar -xvf NODE.tar.xz
```

**Skift til mappen der netop blev pakket ud**

```
cd node-v18.8.0-linux-arm64
```

**Fjern fluff**

```
rm LICENSE *.md
```

Bekræft hvad der er tilbage i mappen - kør kommandoen `ls` hvor output skal gerne være 4 mapper a la det her:

```
bin  include  lib  share
```

Alle 4 mapper skal kopieres over i vores `/usr/local/` mappe - brug derfor flaget `-R` når du laver `cp` kommandoen, for at kopiere rekursivt og vælg samtlige mapper ved `./*`, efterfulgt af destinationen `/usr/local/`. Kommandoen skal køres som sudo

```
sudo cp -R ./* /usr/local/ 
```

## Undgå ERR! EACCESS fejl

Standard permissions i enhver Linux distribution er altid mere låste end de er praktiskte. Hvis vi inden vi begynder at installere ting med NPM sørger for at have en mappe lavet til node_modules og det er vores mappe, undgår vi fejl ved installering.

Lav en global mappe

```
mkdir ~/.npm-global
```

Indstil NPM til at bruge den nyoprettede mappe

```
npm config set prefix '~/.npm-global' 
```

Inkludér din nye mappe i din $PATH - hvor du sætter din $PATH afhænger nok lidt af dit setup, jeg tilføjer nedenstående linje i min `~/.zshrc` fil på serveren ,der loades hver gang cli'en loades. (kan være .bashrc/.profile alt efter hvad du bruger)

```
export PATH=~/.npm-global/bin:~/.npm-globa/lib/node_modules:$PATH
```

Fra nu af, når en ny terminal spawnes, er det med disse to mapper inkludderet i din PATH. Verificer ved at køre `echo $PATH` og hvis du kan se noget a la `$HOME/.npm-global/bin` og `$HOME/.npm-global/lib/node_module` i dit output er vi gucci.

```bash
$source ~/.zshrc
$echo $PATH

/home/opc/.npm-global/lib/node_modules:/home/opc/.npm-global/bin:/home/opc/.npm-global/bin:/home/opc/.npm-global/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/opc/bin
```

## Test alting

Den klassiske er `node -v` der gerne skulle give dig `v18.8.0` i output

Den ægte test er at installere noget

```
npm i -g debug
```

Får du ingen fejl, så har du installeret den seneste NodeJS på Oracle Cloud (og nu også npm package "debug")

### TL;DR

Gem dette script som [`get-node.sh`](get-node.sh?fileId=28703) og gør eksekverbar med `chmod +x get-node.sh`

Kør med `./get-node.sh eller bash get-node.sh`

```bash
#!/bin/bash
cd ~

mkdir repos
cd repos
wget -O NODE.tar.xz "https://nodejs.org/dist/v18.8.0/node-v18.8.0-linux-arm64.tar.xz"
tar -xvf NODE.tar.xz
rm NODE.tar.xz
cd node-v18.8.0-linux-arm64
rm *.md LICENSE
cp -R ./* /usr/local/
cd ..
rm -rf node-v18.8.0-linux-arm64

# Fix permissions
cd ~
mkdir .npm-global
npm config set prefix '~/.npm-global' 
echo "export PATH=~/.npm-global/bin:~/.npm-globa/lib/node_modules:$PATH" >> ~/.zshrc
source ~/.zshrc
```

### Fortsættes i ["Reverse Proxy med nginx og NodeJS"](Reverse%20Proxy%20med%20nginx%20og%20NodeJS.md?fileId=28763) ...