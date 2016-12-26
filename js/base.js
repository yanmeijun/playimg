require.config({
	paths:{
		'jquery':'jquery1.7'
	}
})

require(['main'],function(main){
	
	main()
	$('#wrap').say({
		box:'#head',
		list:'#list',
		oli:'#oli',
		left:'#left',
		right:'#right'
	})

})