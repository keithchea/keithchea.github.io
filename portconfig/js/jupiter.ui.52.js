/** 
* @namespace 
*/
var PortLayout = {};
$(document).ready(function() {
	
	PortLayout.Global = {
		configName: "Arista DCS-7050S-52",
		configPort : 52,
		pnNumber: "A-900-012-01",
		salesOrderNumber: "",
		
		showSpace : function() {
			$(".jport-config-grp").removeClass("jport-config-spacing-small");
			$(".jport-config-grp").removeClass("jport-config-top-margin");
			$(".jport-config-grp .jport-config-port").removeClass("jport-config-bottom-margin");			
			$(".jport-config-grp .jport-config-port").removeClass("jport-config-port-width");
			
			$(".jport-config-port-layout .jport-config-port").each(function(index, data) {
				if (index == 15) {
					$(this).parent().addClass("jport-config-spacing-small");
				}
				if (index == 30) {
					$(this).parent().addClass("jport-config-spacing-small");						
				}
				if (index == 46) {
					$(this).parent().addClass("jport-config-spacing-small");						
				}
				if (index > 47) {
					$(this).parent().addClass("jport-config-top-margin");
					$(this).addClass("jport-config-bottom-margin");
					$(this).addClass("jport-config-port-width");
				}
			});	
		},			
	};
	
});