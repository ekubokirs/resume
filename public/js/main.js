$(document).ready(function(){
	$.ajax('/api/resumes/51c208398ed32d2728000001',{
		complete : function (response){
			var firstName= response.responseJSON.name_first;
			var lastName= response.responseJSON.name_last
			var fullName= firstName+' '+lastName;
			var email= response.responseJSON.contact_info.email;
			var phone = response.responseJSON.contact_info.phone;
			var street = response.responseJSON.contact_info.street_address.street;
			var city = response.responseJSON.contact_info.street_address.city+',';
			var state =response.responseJSON.contact_info.street_address.state;
				$('#name').html(fullName);
				$('#email').html(email);
				$('#phone').html(phone);
				$('#street').html(street);
				$('#city').html(city);
				$('#state').html(state);
			
			var enddate = new Array;
			var location= new Array;
			var organization= new Array;
			var project= new Array;
			var resp= new Array;
			var role = new Array;
			var startdate = new Array;

			for(i=0; i<response.responseJSON.experience.length; i++)
			{
				enddate[i] = response.responseJSON.experience[i].end_month_year;
				location[i] = response.responseJSON.experience[i].location;
				organization[i]= response.responseJSON.experience[i].organization;
				project[i]= response.responseJSON.experience[i].project;
				resp[i]=response.responseJSON.experience[i].project;
				role[i]=response.responseJSON.experience[i].role;
				startdate[i]=response.responseJSON.experience[i].start_month_year;
			}
			
			$('#employer1').html(organization[0])
			$('#employer2').html(organization[1])
			
			$('#role1').html(role[0]);
			$('#role2').html(role[1]);
		}	
	})
})	