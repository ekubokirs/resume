require 'sinatra'
require 'mongoid'
require 'oj'
require "sinatra/reloader" if development?

Mongoid.load!('mongoid.yml')

class Doc
	include Mongoid::Document

	field :name_first, 	type: String

	# embeds_many :street_address

end

# class StreetAddress
#   include Mongoid::Document
  
#   field :street,   type: String
  
#   embedded_in :doc
# end

get '/'  do
	content_type :json

	doc = Doc.all

	doc.to_json
end

get '/:id' do
	content_type :json
	doc = Doc.find params[:id]
	doc.to_json
end


#create
post '/' do
	data=JSON.parse(request.body.read)["resume"]
	doc = Doc.create!(data)
	doc.to_json
end

#update

put '/:id' do
	data=JSON.parse(request.body.read)["resume"]
	doc = Doc.find params[:id]
	doc.update_attributes!(data)
end

# #destroy
delete '/:id' do
	doc = Doc.find params[:id]
	doc.destroy
end