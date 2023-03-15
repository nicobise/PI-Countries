import style from './LandingPage.module.css'
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <>
        <div className={style.centerDiv}>
            <Link
                to={`/mainpage`}
                className={style.LPButton}>
                Let's travel the world!
            </Link>
        </div>
        </>
    );
}