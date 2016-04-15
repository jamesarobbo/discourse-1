class FixTosName < ActiveRecord::Migration
  def up

    I18n.backend.overrides_disabled do
      execute ActiveRecord::Base.sql_fragment('UPDATE user_fields SET name = ? WHERE name = ?', 'terms_of_service.title', "terms_of_service.signup_form_message")
    end

  end
end
