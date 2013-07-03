require 'sinatra'
require 'mongoid'
require 'oj'
require "sinatra/reloader" if development?

Mongoid.load!("mongoid.yml")

module Mongoid
  module Serialization
    def serializable_hash_with_id(options = nil)
      json = serializable_hash_without_id options
      json['id'] = json['_id'] if json.has_key? '_id'
      json
    end
    alias_method_chain :serializable_hash, :id
  end
end

class Doc
  include Mongoid::Document
  
  field :name_first, type: String
  field :name_last,  type: String
  field :linked_in,  type: String
  field :website,    type: String
  field :twitter,    type: String
  
  embeds_one  :contact_info
  embeds_many :schools
  embeds_many :experiences
  embeds_many :skills
  embeds_many :accomplishments
end

class ContactInfo
  include Mongoid::Document
  
  field :phone, type: String
  field :email, type: String
  
  embeds_one  :street_address
  embedded_in :doc
end

class StreetAddress
  include Mongoid::Document
  
  field :street,   type: String
  field :city,     type: String
  field :state,    type: String
  field :zip_code, type: String
  
  embedded_in :contact_info
end

class School
  include Mongoid::Document
  
  field :name,              type: String
  field :degree,            type: String
  field :gpa,               type: Float
  field :major,             type: String
  field :minor,             type: String
  field :start_month_year,  type: String
  field :end_month_year,    type: String
  
  embedded_in :doc
end

class Experience
  include Mongoid::Document
  
  field :organization,      type: String
  field :project,           type: String
  field :role,              type: String
  field :start_month_year,  type: String
  field :end_month_year,    type: String
  field :location,          type: String
  field :responsibilities,  type: Array
  
  embedded_in :doc
end

class Skill
  include Mongoid::Document
  
  field :title,      type: String
  field :category,   type: String
  field :experience, type: Integer
  
  embedded_in :doc
end

class Accomplishment
  include Mongoid::Document
  
  field :title,       type: String
  field :month_year,  type: String
  field :description, type: String
  
  embedded_in :doc
end

get '/' do
  erb :index
end

get '/wdiclass' do
 erb :wdiclass
end

get '/api/resumes' do
  content_type :json
  
  docs = Doc.all
  
  docs.to_json
end

get '/api/resumes/:id' do
  content_type :json
  
  begin
    doc = Doc.find(params[:id])
  
    doc.to_json
  rescue Mongoid::Errors::DocumentNotFound => e
    status 404
  end
end

post '/api/resumes' do
  content_type :json
  
  begin
    data = JSON.parse(request.body.read)["resume"]
    id = Doc.create!(data)._id
    status 201
    { success: true, id: id }.to_json
  rescue Mongoid::Errors::Validations => e
    status 422
    { success: false, message: e.message }.to_json
  end
end

put '/api/resumes/:id' do
  content_type :json
  
  begin
    doc = Doc.find(params[:id])
  
    begin
      data = JSON.parse(request.body.read)["resume"]
      puts data
      doc.update_attributes!(data)
      status 200
      { sucess: true, id: params[:id] }.to_json
    rescue Mongoid::Errors::Validations => e
      status 422
      { success: false, message: e.message }.to_json
    end
    
  rescue Mongoid::Errors::DocumentNotFound => e
    status 404
  end
end

delete '/api/resumes/:id' do
  content_type :json
  
  Doc.find(params[:id]).destroy
  
  status 204
end