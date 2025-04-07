import classes from './eShop.module.scss'
import { Button } from '../../../Components'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { MouseEventHandler } from 'react'

type Props = {
  piece: number | undefined
  priceTotal: number | string | undefined
  incHandler: MouseEventHandler<HTMLButtonElement>
  decHandler: MouseEventHandler<HTMLButtonElement>
}

export const OrderBox = ({ piece, priceTotal, incHandler, decHandler }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <div className={classNames('display-flex-start like-box', classes.orderWrapper)}>
        <h5 className="display-inline-block">Ordered pieces:</h5>
        <span className={classes.mark}>{piece}</span>
        <h5 className="display-inline-block">Price Total:</h5>
        <span className={classes.mark}>{priceTotal && priceTotal}</span>
        GBP
        <Button
          classesName={classNames(
            'btn-link-has-ico',
            classes.btn,
            piece && piece < 2 && classes.hasRadius
          )}
          title={'+'}
          OnClick={incHandler}
          rest={{ type: 'submit', disabled: piece && piece === 6 }}
          ariaLabel={`${t('eShop.ariaLabel.incPiece')}`}
        />
        {piece && piece > 1 && (
          <Button
            classesName={classNames(
              'btn-link-has-ico',
              classes.btn,
              classes.decrease,
              classes.hasRadius
            )}
            title={'-'}
            OnClick={decHandler}
            rest={{ type: 'submit', disabled: piece === 1 }}
          />
        )}
      </div>

      {piece === 6 && (
        <p className="color-is-red">
          You can order <strong>only 6 items per product</strong>
        </p>
      )}
    </>
  )
}
