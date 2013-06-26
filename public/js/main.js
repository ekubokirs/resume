$(document).ready(function(){
	$.ajax('/api/resumes/51c208398ed32d2728000001',{
		complete : function (response){
			console.log(response.responseJSON);
/*Putting information into the index.html form*/
			var firstName =response.responseJSON.name_first;
			var lastName = response.responseJSON.name_last;
			var fullName = firstName + ' '+ lastName;

			var email=response.responseJSON.contact_info.email;
			var phone= response.responseJSON.contact_info.phone;

			var street = response.responseJSON.contact_info.street_address.street;
			var city = response.responseJSON.contact_info.street_address.city;
			var state = response.responseJSON.contact_info.street_address.state;
			var zip_code= response.responseJSON.contact_info.street_address.zip_code;
			var address=city+ ', '+state+''+zip_code;

				$('#name').html(fullName);
				$('#email').html(email);
				$('#phone').html(phone);
				$('#street').html(street);
				$('#address').html(address);

/*Adding arrays to index.html*/
			for(i=0; i<response.responseJSON.experience.length; i++){
				var list = $('<ul>');
				$('#experience').append(list);
					output_line_item ('Organization', response.responseJSON.experience[i].organization, list);
					output_line_item ('Position', response.responseJSON.experience[i].role, list);
					output_line_item ('Start Date', response.responseJSON.experience[i].start_month_year, list);
					output_line_item ('End Date', response.responseJSON.experience[i].end_month_year, list);
					output_line_item ('Location', response.responseJSON.experience[i].location, list);
					output_line_item ('Project', response.responseJSON.experience[i].project, list);
					output_line_item ('Responsibilites', response.responseJSON.experience[i].responsibilites, list);
			};
			for(i=0; i<response.responseJSON.schools.length; i++){
				var list = $('<ul>');
				$('#education').append(list);
					output_line_item ('Institution', response.responseJSON.schools[i].name,list);
					output_line_item ('Degree', response.responseJSON.schools[i].degree,list);
					output_line_item ('Start Date', response.responseJSON.schools[i].start_month_year,list);
					output_line_item ('End Date', response.responseJSON.schools[i].end_month_year,list);
					output_line_item ('GPA', response.responseJSON.schools[i].gpa,list);
					output_line_item ('Major', response.responseJSON.schools[i].major,list);
					output_line_item ('Minor', response.responseJSON.schools[i].minor,list);
			}
			for(i=0; i<response.responseJSON.skill.length; i++){
				var list = $('<ul>');
				$('#skills').append(list);
					output_line_item('Category', response.responseJSON.skill[i].category, list);
					output_line_item('Experience', response.responseJSON.skill[i].experience, list);
					output_line_item('Title', response.responseJSON.skill[i].title, list);
			}		
			function output_line_item (label_item, line_item, list){
				list.append('<li><span class=\"label\">' + label_item + ': '+'</span>'+line_item+'</li>');
			}
		}
	})
})