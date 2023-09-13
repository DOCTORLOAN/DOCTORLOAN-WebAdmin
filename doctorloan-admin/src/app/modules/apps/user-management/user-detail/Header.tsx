/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'

import ButtonFormHook from 'src/app/components/Forms/Button'
import {StatusEnum} from 'src/app/utils/enums/status.eneum'
import {TabModel} from 'src/app/types/Commons/tab.model'

type Props = {
  listTab: TabModel[]
  isLoading: boolean
  idForm?: string
  id?: string
  isValid?: boolean
  setValue?: any
  onSubmit?: () => void
}

const Header = ({listTab, idForm, id, isLoading, isValid, setValue, onSubmit}: Props) => {
  const location = useLocation()
  const [currentBtn, setCurrentBtn] = useState<StatusEnum>()

  const handleSubmitPublish = () => {
    setCurrentBtn(StatusEnum.Publish)
    onSubmit && onSubmit()
  }

  const handleSubmitDraft = () => {
    setCurrentBtn(StatusEnum.Draft)
    onSubmit && onSubmit()
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-body p-0'>
        <div className='d-flex justify-content-between align-items-center'>
          <div style={{paddingLeft: '1rem'}}>
            <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
              {listTab.map((item, index) => (
                <li className='nav-item' key={index}>
                  <Link
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === item.url && 'active')
                    }
                    to={item.url}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className='mb-2'>
            <div className='my-4'>
              <ButtonFormHook
                type='button'
                id={'btn-draft-' + idForm}
                label='Hủy'
                loading={currentBtn === StatusEnum.Draft && isLoading}
                className='btn-sm btn-light me-2'
                disabled={isLoading || !isValid}
                onClick={handleSubmitDraft}
              />

              <ButtonFormHook
                type='button'
                id={'btn-publish-' + idForm}
                label='Lưu'
                loading={currentBtn === StatusEnum.Publish && isLoading}
                className='btn-sm btn-primary me-3'
                disabled={isLoading || !isValid}
                onClick={handleSubmitPublish}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
