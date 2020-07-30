# Sbol Visualizer 

A web component that gives the possibility to include and visualise a Synthetic Biology Open Language (SBOL) sequence in any webpage using the modern web component approach. 

Once you add the necessary script to your page you will call Sbol Visualizer as a normal HTML node.

I.e. :

	<sbol-viewer source="./sbol.json"></sbol-viewer>

OR
	
	<sbol-viewer format="json" data='{   
	        "pk": 3911,
	        "friendly_id": "M3GC5GR",
	        "num_collaborators": null,
	        "name": "LacZalpha-pUC18-IIs sites up (SEVA# - - 3X)",
	        "sequence":"GAAGCGGAAGAGCGCCCAATACGCAAACCGCCTCTCCCCGCGCGTTGGCCGATTCATTAATGCAGCTGGCACGACAGGTTTCCCGACTGGAAAGCGGGCAGTGAGCGCAACGCAATTAATGTGAGTTAGCTCACTCATTAGGCACCCCAGGCTTTACACTTTATGCTTCCGGCTCGTATGTTGTGTGGAATTGTGAGCGGATAACAATTTCACACAGGAAACAGCTATGACCATGATTACGAATTCGAGCTCGGTACCCGGTCTCAACCCACCTGCGATGACCCGTCTCTACCCGAAGACTTACCCGATATCGCGATTGTCTTCGCGACGAGACGCGACATCGCAGGTGCGACGAGACCAAGGGGATCCTCTAGAGTCGACCTGCAGGCATGCAAGCTTGGCACTGGCCGTCGTTTTACAACGTCGTGACTGGGAAAACCCTGGCGTTACCCAACTTAATCGCCTTGCAGCACATCCCCCTTTCGCCAGCTGGCGTAATAGCGAAGAGGCCCGCACCGATCGCCCTTCCCAACAGTTGCGCAGCCTGAATGGCGAATGGCGCCTGATGCGGTATTTTCTCCTTACGCATCTGTGCGGTATTTCACACCGCATATGATGCACTCTCAGTACAATCTGCTCTGATGCCGCATAGTTAAGCCAGCCCCGACACCCGCCAACACCCGCTGA",
	        "public": true,
	        "obsolete": false,
	        "annotations":[
	            {"pk":22354,"start":195,"end":219,"direction":0,"name":"F24 primer bind 1","notes":"","role_id":29, "SBOL": "SO:0001729"},
	            {"pk":31032,"start":226,"end":259,"direction":1,"name":"lacZa*_18_interval_1 2","notes":"","role_id":37, "SBOL": "SO:0001737"}, {"pk":231039,"start":312,"end":361,"direction":1,"name":"MIIs C1 (gcga) 21","notes":"Insertion","role_id":27, "SBOL": "SO:0001729"}
	        ]}'></sbol-viewer>


## Important files:

	/public/inc/SBOL-visual
	        Needs to host PNG images provided by
	        https://sbolstandard.org/visual/glyphs/ 
	        actual github is https://github.com/SynBioDex/SBOL-visual
	        
	SBOLcomponets.json
	    We use this file to 1:1 map of annotations with SBOL symbols
	    - Any components need to be configured here in order to be visible 
	    	on the visualizer


Web Coponents need to be lighweight in order to be easy to download. 



## install
    $ git clone [repo]
   	 
   	 $
    npm install
    npm run serve


## API used 

https://canvas.synbioks.org/canvas/
https://synbiohub.github.io/api-docs/#about-synbiohub
https://vows.sbolstandard.org