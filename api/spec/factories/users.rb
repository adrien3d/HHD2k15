# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  authentication_token   :string
#  telephone_number       :string
#  address                :string
#  first_name             :string
#  last_name              :string
#  sex                    :string
#  birthdate              :date
#  description            :date
#

FactoryGirl.define do
  factory :user do
    email "dupont@guide.com"
    password "user1234"
    password_confirmation "user1234"
    first_name "Maxence"
    last_name "Dupont"
  end
end
