/* eslint-disable no-template-curly-in-string */
import {useIntl} from 'react-intl'

function useLanguage() {
  const intl = useIntl()

  const language = {
    common: {
      waiting: intl.formatMessage({id: 'COMMON.WAITING'}),
      create: intl.formatMessage({id: 'COMMON.CREATE'}),
      update: intl.formatMessage({id: 'COMMON.UPDATE'}),
      validation: {
        required: intl.formatMessage({id: 'COMMON.VALIDATION.REQUIRED'}, {name: '${path}'}),
        max: intl.formatMessage({id: 'COMMON.VALIDATION.MAX'}, {name: '${path}', number: 50}),
        min: intl.formatMessage({id: 'COMMON.VALIDATION.MIN'}, {name: '${path}', number: 50}),
        invalid: intl.formatMessage({id: 'COMMON.VALIDATION.INVALID'}, {name: '${path}'}),
      },
    },
    signInPage: {
      title: intl.formatMessage({id: 'SIGNING.TITLE'}),
      userName: intl.formatMessage({id: 'SIGNING.USERNAME'}),
      password: intl.formatMessage({id: 'SIGNING.PASSWORD'}),
      forget_pass: intl.formatMessage({id: 'SIGNING.FORGET_PASS'}),
      btn_login: intl.formatMessage({id: 'SIGNING.BTN_REGISTER'}),
      validation: {
        userName: {
          required: intl.formatMessage(
            {id: 'COMMON.VALIDATION.REQUIRED'},
            {name: intl.formatMessage({id: 'SIGNING.USERNAME'})}
          ),
          min: intl.formatMessage(
            {id: 'COMMON.VALIDATION.MIN'},
            {name: intl.formatMessage({id: 'SIGNING.USERNAME'}), number: 3}
          ),
          max: intl.formatMessage(
            {id: 'COMMON.VALIDATION.MAX'},
            {name: intl.formatMessage({id: 'SIGNING.USERNAME'}), number: 20}
          ),
        },
        password: {
          required: intl.formatMessage(
            {id: 'COMMON.VALIDATION.REQUIRED'},
            {name: intl.formatMessage({id: 'SIGNING.PASSWORD'})}
          ),
          formatPassword: intl.formatMessage(
            {id: 'COMMON.VALIDATION.FORMAT_PASSWORD'},
            {name: intl.formatMessage({id: 'SIGNING.PASSWORD'})}
          ),
        },
      },
    },
    userPage: {
      title: intl.formatMessage({id: 'USER.TITLE'}),
      code: intl.formatMessage({id: 'USER.CODE'}),
      role: intl.formatMessage({id: 'USER.ROLE'}),
      firstName: intl.formatMessage({id: 'USER.FIRSTNAME'}),
      lastName: intl.formatMessage({id: 'USER.LASTNAME'}),
      name: intl.formatMessage({id: 'USER.NAME'}),
      email: intl.formatMessage({id: 'USER.EMAIL'}),
      phone: intl.formatMessage({id: 'USER.PHONE'}),
      gender: intl.formatMessage({id: 'USER.GENDER'}),
      male: intl.formatMessage({id: 'USER.MALE'}),
      female: intl.formatMessage({id: 'USER.FEMALE'}),
      dob: intl.formatMessage({id: 'USER.DOB'}),
      password: intl.formatMessage({id: 'USER.PASSWORD'}),
      confirm_password: intl.formatMessage({id: 'USER.CONFIRM_PASSWORD'}),
      address: intl.formatMessage({id: 'USER.ADDRESS'}),

      tab_infor: intl.formatMessage({id: 'USER.TAB_INFOR'}),
      tab_roles: intl.formatMessage({id: 'USER.TAB_ROLE'}),
      tab_notify: intl.formatMessage({id: 'USER.TAB_NOTIFY'}),
      tab_email_setting: intl.formatMessage({id: 'USER.TAB_NOTIFY'}),

      validation: {
        code: {
          required: intl.formatMessage(
            {id: 'COMMON.VALIDATION.REQUIRED'},
            {name: intl.formatMessage({id: 'USER.CODE'})}
          ),
          max: intl.formatMessage(
            {id: 'COMMON.VALIDATION.MAX'},
            {name: intl.formatMessage({id: 'USER.CODE'}), number: 50}
          ),
        },
        firstName: {
          required: intl.formatMessage(
            {id: 'COMMON.VALIDATION.REQUIRED'},
            {name: intl.formatMessage({id: 'USER.FIRSTNAME'})}
          ),
        },
        lastName: {
          required: intl.formatMessage(
            {id: 'COMMON.VALIDATION.REQUIRED'},
            {name: intl.formatMessage({id: 'USER.LASTNAME'})}
          ),
        },
        email: {
          required: intl.formatMessage(
            {id: 'COMMON.VALIDATION.REQUIRED'},
            {name: intl.formatMessage({id: 'USER.EMAIL'})}
          ),
          invalid: intl.formatMessage(
            {id: 'COMMON.VALIDATION.INVALID'},
            {name: intl.formatMessage({id: 'USER.EMAIL'})}
          ),
        },
        gender: {
          required: intl.formatMessage(
            {id: 'COMMON.VALIDATION.REQUIRED'},
            {name: intl.formatMessage({id: 'USER.GENDER'})}
          ),
        },
        password: {
          required: intl.formatMessage(
            {id: 'COMMON.VALIDATION.REQUIRED'},
            {name: intl.formatMessage({id: 'USER.PASSWORD'})}
          ),
          formatPassword: intl.formatMessage(
            {id: 'COMMON.VALIDATION.FORMAT_PASSWORD'},
            {name: intl.formatMessage({id: 'SIGNING.PASSWORD'})}
          ),
        },
        confirmPassword: {
          required: intl.formatMessage(
            {id: 'COMMON.VALIDATION.REQUIRED'},
            {name: intl.formatMessage({id: 'USER.CONFIRM_PASSWORD'})}
          ),
          match: intl.formatMessage(
            {id: 'COMMON.VALIDATION.DOES_NOT_MATCH'},
            {
              name_1: intl.formatMessage({id: 'USER.CONFIRM_PASSWORD'}),
              name_2: intl.formatMessage({id: 'USER.PASSWORD'}),
            }
          ),
        },
      },
    },
  }
  return {language}
}

export default useLanguage
