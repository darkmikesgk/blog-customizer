import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButtonProps = {
	isMenuOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = ({ isMenuOpen, onClick }: TArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			onClick={onClick}
			className={clsx({
				[styles.container]: true,
				[styles.container_open]: isMenuOpen,
			})}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.container]: true,
					[styles.arrow_open]: isMenuOpen,
				})}
			/>
		</div>
	);
};
