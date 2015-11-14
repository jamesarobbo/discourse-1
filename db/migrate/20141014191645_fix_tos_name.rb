class FixTosName < ActiveRecord::Migration
  def up

    I18n.backend.overrides_disabled do
      execute ActiveRecord::Base.sql_fragment('UPDATE user_fields SET name = ? WHERE name = ?', I18n.t('terms_of_service.title', skip_overrides: true), I18n.t("terms_of_service.signup_form_message", skip_overrides: true))
    end

  end
end
