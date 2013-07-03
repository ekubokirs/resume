$(document).ready(function(){
	$.ajax('/api/resumes',{
		complete : function (response){
			var object = response.responseJSON;
			var resume = response.responseJSON[object.length-1];

			console.log("my id: "+ resume.id);
			console.log(resume);
			/*Putting information into the index.html form*/
			var firstName 	= resume.name_first;
			var middleName	= resume.name_middle;
			var lastName 	= resume.name_last;
			var fullName	= firstName + ' '+middleName+' '+ lastName;

			var email		= resume.contact_info.email;
			var phone		= resume.contact_info.phone;

			var street		= resume.contact_info.street_address.street;
			var city 		= resume.contact_info.street_address.city;
			var state		= resume.contact_info.street_address.state;
			var zip_code	= resume.contact_info.street_address.zip_code;
			var address 	= city+ ', '+state+' '+zip_code;

			var twitter		= resume.twitter;
			var website		= resume.website;

				$('#name').attr('data-id', resume.id).html(fullName);
				$('#email').html(email);
				$('#phone').html(phone);
				$('#street').html(street);
				$('#address').html(address);
				$('#twitter').html(twitter);
				$('#website').html(website);

			function generateSchoolBlock(currentSchool, schoolData){
				var item= "<div class='neweducation'><span class='schoolName'> "+schoolData.name+"</span><span class='degree'> "+schoolData.degree+"</span><span class='dates'> "+schoolData.start_month_year+'-'+schoolData.end_month_year+"</span><br><span class=gpa>GPA: "+schoolData.gpa+"</span><br><span class='major'>Major: "+schoolData.major+"</span><br><span class='minor'>Minor: "+schoolData.minor+"</span></div>"
				$('#educationHolder').append(item);
			}
			$.each(resume.schools,generateSchoolBlock);

			function generateExperienceBlock(currentExp, expData){
				var item="<div class='newexperience'><span class='neworganization'> "+expData.organization+"</span><span class='position'> "+expData.role+"</span><span class='date'> "+expData.start_month_year+"-"+expData.end_month_year+"</span><br><span class='location'>"+expData.location+"</span><br><span class='project'>Project: "+expData.project+"</span><br><span class='responsibilites'> Responsibilites: "+expData.responsibilities+"</span></div>"
				$('#experienceHolder').append(item);
			}
			$.each(resume.experience, generateExperienceBlock);

			function generateSkillBlock(currentSkill, skillData){
				var item= "<div class='newskill'><span class='newcategory'>Category: "+skillData.category+"</span><br><span class='experience2'>Experience: "+skillData.experience+"</span><br><span class='title'>Title: "+skillData.title+"</span></div>"
				$('#skillsHolder').append(item);
			}
			$.each(resume.skill,generateSkillBlock);
		}
	});/*end of ajax request*/

	$('.delete').click(function(){
		var id= $('#name').data('id');
		console.log(id);
		$.ajax({
			url: '/api/resumes/'+id,
			type: 'DELETE',
			success: 'You have deleted a file'
		}).done( function(){
			alert('Deleted '+id);
		});/*end of ajax3*/
		window.location=window.location;
	});/*end of function*/
	
	//Adding the more blocks to each block on sign ups*/
	$('.experience_block_add').click(function(){
		var html =$('.experience_block').first().clone();
 			html.css('display','none');
 		$(this).before(html);
 			html.slideDown(600);
			html.find('input').val('');
		return false;
	});

	$('.education_block_add').click(function(){
		var html =$('.education_block').first().clone();
			html.css('display','none');
		$(this).before(html);
			html.slideDown(600);
			html.find('input').val('');
		return false;
	});

	$('.skill_block_add').click(function(){
		var html = $('.skill_block').first().clone();
			html.css('display','none')
		$(this).before(html);
			html.slideDown(600);
			html.find('input').val('');
		return false;
	});

	//Reading data from signup.html
	$('#userDataForm').submit(function(){
		var userData={};
			
		userData.name_first	=$('.firstName').val();
		userData.name_last	=$('.lastName').val();
		
		userData.contact_info={};
		userData.contact_info.email	=$('.email').val();
		userData.contact_info.phone	=$('.phone').val();
			
		userData.contact_info.street_address={};
		userData.contact_info.street_address.street	=$('#street').val();
		userData.contact_info.street_address.city	=$('.city').val();
		userData.contact_info.street_address.state	=$('.state').val();
		userData.contact_info.street_address.zip_code=$('.zipcode').val();

		userData.twitter	=$('.twitter').val();
		userData.linked_in	=$('.linkedin').val();
		userData.website	=$('.website').val();


		userData.experience=[];
		var experience_blocks=$('.experience_block');

		
		experience_blocks.each(function(index,item){
			
			var startDate = $(item).find('.startdate').val();
				var formattedStartDate = startDate.slice(5,7)+startDate.slice(2,4);
			
			var endDate = $(item).find('.enddate').val();
				var formattedEndDate =endDate.slice(5,7)+endDate.slice(2,4);
			
			userData.experience.push({
				start_month_year: formattedStartDate,
				location: $(item).find('.location').val(),
				end_month_year: formattedEndDate,
				organization: $(item).find('.organization').val(),
				project: $(item).find('.project').val(),
				role: $(item).find('.position').val(),

				// $$TEMP: hack
				responsibilities : ['blah', 'blah blah']
			});
		});

		userData.schools= [];
		var education_blocks=$('.education_block');

		education_blocks.each(function(index, item) {
			
			var startDate = $(item).find('.startdate').val();
				 var formattedStartDate = startDate.slice(5,7)+startDate.slice(2,4);
			
			var endDate = $(item).find('.enddate').val();
				var formattedEndDate = endDate.slice(5,7)+endDate.slice(2,4);
			
			userData.schools.push({
				start_month_year: formattedStartDate,
				name 		: $(item).find('.school_id').val(),
				degree 		: $(item).find('.degree').val(),
				end_month_year	: formattedEndDate,
				location 	: $(item).find('.location').val(),
				major 		: $(item).find('.major').val(),
				minor 		: $(item).find('.minor').val(),
				GPA 		: $(item).find('.gpa').val()
			});
		});

		userData.skill=[];
		var skill_blocks=$('.skill_block');

		skill_blocks.each(function(index,item){
			userData.skill.push({
				category: $(item).find('.category').val(),
				title: $(item).find('.title').val(),
				experience: $(item).find('.experience').val()
			});
		});

		console.log(userData);
		
		var JSON_data=JSON.stringify({'resume':userData});
		console.log(JSON_data);
		
			$.ajax({
				url: '/api/resumes',
				type: 'POST',
				data: JSON_data,
				success: function(response){
					console.log(response);
					return false;
				}
			});/*end of ajax*/
		return false;
	});/*end of submit function*/

	// $('.previous').click(function(){
	// 	var id= $('#name').data('id');
	// 	$('#name').removeData();
	// 	$.ajax('api.resumes',{
	// 		complete:function(response){
	// 			var totalResumes = response.responseJSON.length;
	// 			for(i=0; i<totalResumes; i++){
	// 				if (i === response.responseJSON.length-1)
	// 					var resume=response.responseJSON[0];
	// 				else
	// 					var resume=response.responseJSON[i-1];
	// 				fill
	// 			}
	// 		}//end of complete function
	// 	});//end of ajax function
	// });//end of *previous fuction
})/*end of document ready*/

