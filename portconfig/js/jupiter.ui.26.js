/** 
* @namespace 
*/
var PortLayout = {};
$(document).ready(function() {
	
	PortLayout.Global = {
		configName: "Fujitsu XG2600",
		configPort : 26,
		pnNumber: "A-900-012-01",
		salesOrderNumber: "",
		
		showSpace : function() {			
			$(".jport-config-grp").removeClass("jport-config-spacing-large");
			$(".jport-config-grp").removeClass("jport-config-spacing-small");
			
			$(".jport-config-port-layout .jport-config-port").each(function(index, data) {
				if (index == 11) {
					$(this).parent().addClass("jport-config-spacing-large");
				}
				if (index == 23) {
					$(this).parent().addClass("jport-config-spacing-small");						
				}
			});	
		},			
	};
});
