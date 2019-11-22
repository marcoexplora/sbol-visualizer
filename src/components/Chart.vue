<template>
    <div>
        <svg></svg>   
        <p>selected : {{ annotationSelected }}</p>
    </div>
</template>
<script>
import * as d3 from 'd3';

export default {
    props: ["annotations", "annotationSelected"],
    data() {
        return {
            editor: null
        }
    },
    methods: {
        render(annotations) {
            window.console.log("ooo", annotations);
            
            //const d = data;
            this.editor = d3
                .select("svg")
                //.attr("width", "100%")
                .attr("height", 200);

            this.editor.append("defs")
                .append("marker")
				.attr("id", "arrow")
				.attr("viewBox","0 -5 10 10")
				.attr("refX",5)
				.attr("refY",0)
				.attr("markerWidth",4)
				.attr("markerHeight",4)
				.attr("orient","auto")
				.append("path")
					.attr("d", "M0,-5L10,0L0,5")
					.attr("class","arrowHead");

            this.drawRuler()

            this.drawPromoter()

            this.drawRBS()

            //this.drawCDS()
            this.drawShape("CDS", 110)
           
            this.drawTerminator()
            //this.drawAptamer()
            this.drawShape("Aptamer", 250)
            this.drawProtein()
           
        },
        drawRuler() {
            this.editor.append("line")
                .attr("x1", 10)
                .attr("y1", 100)
                .attr("x2", 500)
                .attr("y2", 100)     
                .attr("stroke", "#000")
                .attr("stroke-width", 3)
        },
        drawShape(type, x, y = 100) {
            const shapes = {
                'Aptamer': () => {
                    return "M 0,0 0,-11.5668 c 3.25316,-0.83762 5.65964,-3.78365 5.65964,-7.29791 0,-0.76821 -0.11621,-1.50849 -0.32901,-2.20651 l 6.84439,-3.95194 c 0.53125,0.28676 1.12967,0.46334 1.77637,0.46334 2.08426,0 3.7731,-1.68884 3.7731,-3.7731 0,-2.0835 -1.68884,-3.77309 -3.7731,-3.77309 -2.08501,0 -3.77309,1.68959 -3.77309,3.77309 0,0.034 0.009,0.0664 0.0106,0.0996 l -6.83609,3.94591 c -1.35756,-1.31304 -3.2026,-2.1235 -5.24082,-2.1235 -4.16625,0 -7.54619,3.37843 -7.54619,7.54619 0,3.51501 2.40648,6.46029 5.65964,7.29791 l 0,11.5668";
                },
                'CDS': () => {
                    return "m 5.2562231,11 23.6111729,0 10.876433,-11.400584 -10.876433,-11.400585 -23.6111729,0 z"
                }
            }
            let shape = this.editor.append("g")
                .attr('transform', `translate(${x}, ${y})`)

            shape.append("path")
                .attr("d", shapes[type])
                .attr("fill", "#fff")
                .attr("stroke", "#000")
                .attr("stroke-width", 3)    

        },
        drawAptamer() {
            this.editor.append("path")
                .attr('transform', 'translate(250, 100)')
                .attr("d","M 0,0 0,-11.5668 c 3.25316,-0.83762 5.65964,-3.78365 5.65964,-7.29791 0,-0.76821 -0.11621,-1.50849 -0.32901,-2.20651 l 6.84439,-3.95194 c 0.53125,0.28676 1.12967,0.46334 1.77637,0.46334 2.08426,0 3.7731,-1.68884 3.7731,-3.7731 0,-2.0835 -1.68884,-3.77309 -3.7731,-3.77309 -2.08501,0 -3.77309,1.68959 -3.77309,3.77309 0,0.034 0.009,0.0664 0.0106,0.0996 l -6.83609,3.94591 c -1.35756,-1.31304 -3.2026,-2.1235 -5.24082,-2.1235 -4.16625,0 -7.54619,3.37843 -7.54619,7.54619 0,3.51501 2.40648,6.46029 5.65964,7.29791 l 0,11.5668")
                .attr("fill", "#fff")
                .attr("stroke", "#000")
                .attr("stroke-width", 3)    
                .on("click", () => {
                    alert("ciao! Aptamer");
                })
        },
        drawCDS() {
            //m 5.2562231,33.900582 23.6111729,0 10.876433,-11.400584 -10.876433,-11.400585 -23.6111729,0 z
            this.editor.append("path")
                .attr('transform', 'translate(110, 100)')
                .attr('d', "M0,0 L0,-12 L70,-12 L80,0 L70,12 L0,12 Z")
                .attr("opacity", 1)
                .attr("fill", "#C54E46")
                .attr("stroke", "#000")
                .attr("stroke-width", 2)
                .on("click", () => {
                    alert("ciao! CDS");
                })                

        },
        drawGeneric() {
            //.append("ellipse");
            /*
            cx="22.499998"
            cy="22.499998"
            rx="16.32937"
            ry="9.2508135"
            */
        }, 
        drawPrimer() {
            //"m 9.510842,22.532046 26,0 -10,-7"
        },
        drawPromoter() {
            //m 29.000111,5.2464081 8.5,7.4999999 -8.5,7.3333
            //m 7.5001114,39.746408 0,-27 28.9999996,0
            /*this.editor.append("path")
                .attr('transform', 'translate(20, 100)')
                .attr("d", "M0,0 L0,-35 L30,-35")
                .attr("stroke", "#000")
                .attr("stroke-width", 2.5)
                .attr("fill", "none")
                .attr("marker-end","url(#arrow)")
                .on("click", () => {
                    alert("ciao! Promoter");
                })*/
            this.editor.append("path")
                .attr('transform', 'translate(20, 100)')
                .attr("d", "M 0,39.746408 0,-27 28.9999996,0")
                .attr("stroke", "#000")
                .attr("stroke-width", 2.5)
                .attr("fill", "none")
                .on("click", () => {
                    alert("ciao! Promoter");
                })
        },
        drawProtein() {
            //m 15.805033,6.4237289 13.557872,0 0,11.9099541 -6.816388,5.01866 -6.741484,-5.243376 z
            //m 21.683565,20.375099 c 8.864406,-1.922677 9.102925,6.7584 -0.15538,5.286135 9.140445,-2.515454 8.800654,6.934411 -0.08776,5.215394 9.06355,-2.471877 8.98889,6.988159 -0.07466,5.415146
            let protein = this.editor.append("g")
                .attr('transform', 'translate(270, 100)')

            protein.append("circle")                
                .attr("cx", "22.499998")
                .attr("cy","-27.489317")
                .attr("r", "7")
                .attr("fill", "#fff")
                .attr("stroke", "#000")
                .attr("stroke-width", 3)    

            protein.append("path")                
                .attr("d","M 21.683565,-20.375099 c 8.864406,-1.922677 9.102925,7.881981 -0.15538,6.409716 9.140445,-2.515454 8.800654,8.057991 -0.08776,6.338974 9.06355,-2.471877 8.98889,7.812118 -0.07466,6.239105")
                .attr("fill", "#fff")
                .attr("stroke", "#000")
                .attr("stroke-width", 3)    
                .on("click", () => {
                    alert("ciao! Protein");
                })
        },
        drawRBS() {
            const arc = d3.arc();
            this.editor.append("path")
                .attr('transform', 'translate(70, 100)')
                .attr('d', arc({
                    innerRadius: 0,
                    outerRadius: 20,
                    startAngle: -Math.PI*0.5,
                    endAngle: Math.PI*0.5
                }))
                .attr("fill", "#B5A0C7")
                .attr("stroke", "#000")
                .attr("stroke-width", 2)
                .on("click", () => {
                    alert("ciao! RBS");
                })
        },
        drawTerminator() {
            //m -0.07490537,36.685499 c 45.24284437,0 45.24284437,0 45.24284437,0
            let terminator = this.editor.append("g")
                .attr('transform', 'translate(200, 100)')

            terminator.append("path")
                .attr("d", "M15,0 L15,-35 L0,-35 L30,-35 L15,-35") 
                .attr("stroke", "#000")
                .attr("stroke-width", 3)    
                .on("click", () => {
                    alert("ciao! Terminator");
                })
        }
    },
    watch: {
        annotations(dataAnnotations) {
            if (this.editor !== null) this.editor.select("svg").empty();
            this.render(dataAnnotations); 
        }
    }
}
</script>
<style scoped lang="sass">
    svg
        width: 100%
</style>
