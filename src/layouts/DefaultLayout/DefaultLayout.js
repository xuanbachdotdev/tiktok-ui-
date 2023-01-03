import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Sidebar from '../components/Sidebar';
import Button from '~/component/Button';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const btnRef = useRef();
    useEffect(() => {
        window.scrollTo(0, 20);
    }, []);
    useEffect(() => {
        const onScroll = () => {
            window.pageYOffset === 0 ? (btnRef.current.style.bottom = '-32px') : (btnRef.current.style.bottom = '10px');
        };
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleScroll = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div className={cx('content')}>{children}</div>
            </div>
            <div className={cx('wrap-btn')} ref={btnRef} onClick={handleScroll}>
                <Button small className={cx('download-btn')} href="/">
                    Down app
                </Button>
                <button className={cx('scroll-btn')}>scroll</button>
            </div>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
