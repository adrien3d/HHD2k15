class Guide < ActiveRecord::Base
  belongs_to user
  has_many specialities
end
