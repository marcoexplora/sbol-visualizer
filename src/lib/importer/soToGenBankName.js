/*
    This files is from https://github.com/udp/visbol-js ( minor edited )

 Copyright (C) 2015 James McLaughlin.  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions
  are met:

  1. Redistributions of source code must retain the above copyright
     notice, this list of conditions and the following disclaimer.

  2. Redistributions in binary form must reproduce the above copyright
     notice, this list of conditions and the following disclaimer in the
     documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
  OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
  OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
  SUCH DAMAGE.

*/
module.exports = soToGenBankName;

function soToGenBankName(so) {

    return ({
        "SO:0000031": "aptamer",
        "SO:0000057": "operator",
        "SO:0001932": "overhang-site-5",
        "SO:0001933": "overhang-site-3",
        "SO:0000139": "RBS",
        "SO:0000141": "terminator",
        "SO:0000167": "promoter",
        "SO:0000169": "promoter",
        "SO:0000170": "promoter",
        "SO:0000171": "promoter",
        "SO:0000243": "RBS",
        "SO:0000280": "engineered-region",
        "SO:0000296": "origin-of-replication",
        "SO:0000297": "origin",
        "SO:0000299": "recombination-site",
        "SO:0000316": "CDS",
        "SO:0000436": "origin",
        "SO:0000552": "RBS",
        "SO:0000553": "polyA_site",
        "SO:0000568": "promoter",
        "SO:0000613": "promoter",
        "SO:0000614": "terminator",
        "SO:0000615": "terminator",
        "SO:0000617": "promoter",
        "SO:0000618": "promoter",
        "SO:0000621": "promoter",
        "SO:0000627": "insulator",
        "SO:0000637": "engineered-region",
        "SO:0000699": "biopolymer-junction",
        "SO:0000724": "origin-of-transfer",
        "SO:0000750": "origin",
        "SO:0000794": "engineered-region",
        "SO:0000798": "engineered-region",
        "SO:0000804": "engineered-region",
        "SO:0000805": "engineered-region",
        "SO:0000807": "engineered-region",
        "SO:0000915": "engineered-region",
        "SO:0000935": "CDS",
        "SO:0000951": "terminator",
        "SO:0000952": "origin",
        "SO:0000953": "origin",
        "SO:0000981": "terminator",
        "SO:0000982": "terminator",
        "SO:0001203": "promoter",
        "SO:0001204": "promoter",
        "SO:0001205": "promoter",
        "SO:0001206": "promoter",
        "SO:0001207": "promoter",
        "SO:0001236": "biopolymer-base",
        "SO:0001237": "biopolymer-amino-acid",
        "SO:0001263": "non-coding-rna-gene",
        "SO:0001384": "CDS",
        "SO:0001644": "engineered-region",
        "SO:0001546": "protein-stability",
        "SO:0001647": "RBS",
        "SO:0001669": "promoter",
        "SO:0001671": "promoter",
        "SO:0001672": "promoter",
        "SO:0001687": "restriction-site",
        "SO:0001688": "restriction-site",
        "SO:0001691": "blunt-restriction-site",
        //"SO:0001692": "restriction-site",
        "SO:0001896": "CDS",
        "SO:0001913": "promoter",
        "SO:0001953": "assembly-scar",
        "SO:0001955": "protein-stability",
        "SO:0001956": "protease-site",
        "SO:0001957": "rse",
        "SO:0001975": "sticky-restriction-site-5",
        "SO:0001977": "ribonuclease-site",
        "SO:0001978": "signature",
        "SO:0001979": "rna-stability",
        "SO:0002050": "promoter",
        "SO:0002051": "promoter",
        "SO:0005850": "primer-binding-site",
        "SO:1001246": "CDS",
        "SO:1001247": "CDS",
        "SO:1001249": "CDS",
        "SO:1001251": "CDS",
        "SO:1001254": "CDS",
        "SO:1001259": "CDS",
        "SO:1001260": "RBS",
        "SO:0000110": "misc_feature",
        "SO:0000324": "tag",
        "SO:0000417": "protein-domain",
    })[so];

}
