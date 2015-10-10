class Api::V1::ApiController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_action :set_language


  skip_before_filter :verify_authenticity_token

  acts_as_token_authentication_handler_for User, fallback: :exception

  def set_language
    unless params[:language].nil?
      begin
        I18n.locale = params[:language]
      rescue I18n::InvalidLocale
        I18n.locale = :en
      end
    end
  end
end
