import PropTypes from 'prop-types';
import Header from './Header';
import { useState } from 'react';
import MenuItems from './MenuItems';
import className from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/component/Popper';

import styles from './Menu.module.scss';

const cx = className.bind(styles);

const defaultFn = () => {};

function Menu({
    children,
    items = [],
    hideOnClick = false,
    onChange = defaultFn,
    placement,
    offset = [],
    delay = [],
    interactive = true,
    visible = true,
    menuShare = false,
    menuUser = false,
    className,
    ...passProps
}) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1]; //lấy phần tử cuối mảng

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItems
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };
    const props = {
        ...passProps,
    };
    const classes = cx('Wrapper', {
        menuShare,
        [className]: className,
        menuUser,
    });

    const renderResult = (attrs) => (
        <div className={cx('content')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={classes} {...props}>
                {history.length > 1 && !menuShare && <Header title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}> {renderItems()}</div>
            </PopperWrapper>
        </div>
    );

    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };

    return (
        <Tippy
            interactive
            delay={delay}
            offset={offset}
            hideOnClick={hideOnClick}
            placement={placement}
            render={renderResult}
            onHide={handleReset}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Menu;
