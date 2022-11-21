import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import hookahModel from '../../../../assets/3d/hookah.glb';
import hqdModel from '../../../../assets/3d/hqd.glb';
import environmentHdri from '../../../../assets/3d/studio_country_hall_1k.hdr';
import post3 from '../../../../assets/img/news/290331827_1234644000695537_6679753814480063665_n.jpg';
import post1 from '../../../../assets/img/news/291622905_173886368428240_4595744258078663297_n.jpg';
import post2 from '../../../../assets/img/news/291671805_2890127841280929_283707256103487349_n.jpg';
import images from '../../../images.js';
import routes from '../../../routes.js';
import Link from '../../elements/Link/Link.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import Loading from '../../partials/Loading/Loading.js';
import Footer from './../../partials/Footer/index.jsx';
import Navigation from './../../partials/Navigation/index.jsx';

import './main.scss';

import videoBackground from './../../../../assets/img/smoke.mp4';

export default function Main() {
  const { data: topCategoriesData, loading: topCategoriesLoading } =
    useSelector((state) => state.topCategories);

  const getCategoryPath = (category) => {
    return category
      ? `${routes.catalog.to}/${slugify(category.name).toLowerCase()}-${
          category.id
        }`
      : null;
  };

  const newsPosts = [
    {
      title: 'Описание акции',
      description: 'Описание акции',
      image: post1,
    },
    {
      title: 'Описание акции',
      description: 'Описание акции',
      image: post1,
    },
    {
      title: 'Описание акции',
      description: 'Описание акции',
      image: post1,
    },
  ];

  return (
    <div className="home">
      <section className="hero">
        <Navigation theme="transparent-dark" />

        <div className="container">
          <div className="hero__info">
            <div className="hero__info__main">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 2,
                }}
                className="hero__info__title"
              >
                Кальяны и аксессуары
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1.4,
                  duration: 2,
                }}
                className="hero__info__description"
              >
                Наш ассортимент товаров оценят как профессиональные кальянщики,
                так и любители покурить кальян дома. Официальный розничный дилер
                большинства кальянных брендов.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 2.1,
                  duration: 2,
                }}
              >
                <SoftLink className="basic-link" to={routes.catalog.to}>
                  В каталог <span className="arrow">⟶</span>
                </SoftLink>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 2.8,
              duration: 2,
            }}
            className="hero__3d"
          >
            <model-viewer
              src={hookahModel}
              alt="Tbacco Mattpear Classic 3D model"
              environment-image={environmentHdri}
              shadow-intensity="0"
              // camera-controls
              camera-target="0m 2m 0m"
              camera-orbit="0deg 68deg 90%"
              auto-rotate
              // touch-action="pan-y"
              loading="eager"
              disable-touch
              disable-zoom
              style={{ '--poster-color': 'transparent' }}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 3.5,
            duration: 2,
          }}
          className="hero__bg-image"
        >
          <video className="videoTag" autoPlay loop muted>
            <source src={videoBackground} type="video/mp4" />
          </video>
        </motion.div>
      </section>

      <section className="catalog section-padding">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 2,
            }}
            className="section-title"
          >
            Каталог
          </motion.h2>

          {topCategoriesLoading ? (
            <Loading style={{ margin: 0 }} />
          ) : (
            topCategoriesData.results && (
              <div className="catalog__grid">
                {topCategoriesData.results.slice(0, 6).map((cat, idx) => (
                  <motion.article
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 * idx,
                      duration: 0.6,
                    }}
                    key={cat.id}
                    className={
                      idx > 3 ? 'catalog__grid__col2' : 'catalog__grid__col1'
                    }
                  >
                    <SoftLink
                      to={{
                        pathname: getCategoryPath(cat),
                      }}
                    >
                      <img src={cat.image} alt={`tbacco фото ${cat.name}`} />
                      <h3 className="catalog__grid__title">{cat.name}</h3>
                    </SoftLink>
                  </motion.article>
                ))}

                <div className="ios-horizontal-scroll-fixer" />
              </div>
            )
          )}
        </div>
      </section>

      <section className="promo">
        <div className="container">
          <div className="promo__info">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.7,
                duration: 2,
              }}
              className="promo__info__title"
            >
              Нам есть что предложить!
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 1.4,
                duration: 1,
              }}
              className="promo__info__subtitle"
            >
              Ассортимент наполнен самыми популярными брендами и всеми видами
              вкусов. Просто напишите нам в Instagram*
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 1.6,
                duration: 1,
              }}
              className="promo__info__note"
            >
              *Социальная сеть официально внесена в реестр запрещенных сайтов.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 2,
                duration: 1,
              }}
              style={{ marginTop: '30px' }}
            >
              <Link
                href="https://ig.me/m/tbacco.ru"
                className="promo__info__button"
              >
                В инстаграм
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 2.5,
              duration: 1,
            }}
            className="promo__3d"
          >
            <model-viewer
              src={hqdModel}
              alt="Tbacco HQD disposables 3D model"
              camera-target="0m 6.3m 0m"
              camera-orbit="90deg 85deg 110%"
              environment-image={environmentHdri}
              shadow-intensity="0"
              // camera-controls
              auto-rotate
              // touch-action="pan-y"
              loading="eager"
              disable-touch
              disable-zoom
              style={{ '--poster-color': 'transparent' }}
            />
          </motion.div>
        </div>

        {/* <div className="promo__bg-image">
          <img
            src={images.coloredSmoke}
            alt="tbacco фоновое изображение промо"
          />
        </div> */}
      </section>

      <div className="container section-margin-top">
        <h2 className="section-title ">Акции</h2>
        <div class="articles">
          {newsPosts.map((post, index) => (
            <div className="articles__item">
              <motion.article
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5 * index,
                  duration: 1,
                }}
                key={post.id}
              >
                <img src={post.image} alt={`tbacco фото ${post.title}`} />
                <h3 className="articles__title">{post.title}</h3>
                <p className="articles__description">{post.description}</p>
              </motion.article>
            </div>
          ))}
        </div>
      </div>

      <section className="news section-padding section-margin-bottom">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5,
              duration: 1,
            }}
            className="section-title"
          >
            Следите за нами в удобной для вас сети!
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 1,
              duration: 1,
            }}
            className="news__buttons"
          >
            <Link href="https://t.me/tbacco_ru" target="_blank">
              Телеграм
            </Link>

            <Link href="https://vk.com/tbacco" target="_blank">
              Вконтакте
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
