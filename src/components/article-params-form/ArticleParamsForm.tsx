import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState, useRef } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from '../select';
import clsx from 'clsx';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type TArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: TArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(articleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen,
		onChange: setIsMenuOpen,
	});

	const handleInputChange = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectArticleState((prevState) => ({
			...prevState,
			[key]: value,
		}));
	};
	const handleSubmitForm = (evt: FormEvent) => {
		evt.preventDefault();
		setArticleState(selectArticleState);
	};

	const handleResetForm = () => {
		setSelectArticleState(defaultArticleState);
		setArticleState(defaultArticleState);
	};
	return (
		<div ref={rootRef}>
			<ArrowButton isMenuOpen={isMenuOpen} onClose={setIsMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmitForm}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={selectArticleState.fontFamilyOption}
						onChange={(selectElement: OptionType) =>
							handleInputChange('fontFamilyOption', selectElement)
						}
						title={'Шрифт'}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(selectElement: OptionType) =>
							handleInputChange('fontSizeOption', selectElement)
						}
						name={'fontFamily'}
						title={'Размер шрифта'}
					/>
					<Select
						options={fontColors}
						selected={selectArticleState.fontColor}
						onChange={(selectElement: OptionType) =>
							handleInputChange('fontColor', selectElement)
						}
						title={'Цвет шрифта'}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={selectArticleState.backgroundColor}
						onChange={(selectElement: OptionType) =>
							handleInputChange('backgroundColor', selectElement)
						}
						title={'Цвет фона'}
					/>
					<Select
						options={contentWidthArr}
						selected={selectArticleState.contentWidth}
						onChange={(selectElement: OptionType) =>
							handleInputChange('contentWidth', selectElement)
						}
						title={'Ширина контента'}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
