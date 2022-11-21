import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  NavLink as Link,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Scrollbar } from 'react-scrollbars-custom';
import * as actionCreators from '../../../actions/actionCreators.js';
import CatalogPageInfo from '../../../catalogPageInfo.js';
import routes from '../../../routes.js';
import Button from '../../elements/Button/Button.js';
import CheckBox from '../../elements/CheckBox/CheckBox.js';
import RadioCheckBox from '../../elements/RadioCheckBox/RadioCheckBox.js';
import RawHtml from '../../elements/RawHtml/RawHtml.js';
import SoftLink from '../../elements/SoftLink/SoftLink.js';
import TextInput from '../../elements/TextInput/TextInput.js';
import ErrorRetryBox from '../../partials/ErrorRetryBox/ErrorRetryBox.js';
import LoadablePage from '../../partials/LoadablePage/LoadablePage.js';
import Loading from '../../partials/Loading/Loading.js';
import PopoverMenu from '../../partials/PopoverMenu/PopoverMenu.js';
import ProductCard from '../../partials/ProductCard/ProductCard.js';
import TitledPage from '../../partials/TitledPage/TitledPage.js';
import ToggleDataList from '../../partials/ToggleDataList/ToggleDataList.js';
import { extractCategoryId } from '../../utils.js';
import './catalog.scss';

const COUNT_NEXT_PREV_PAGES = 2;
const DEFAULT_ORDERING_VALUE = '-stats';

export default function Catalog() {
  const selector = (state) => state.catalogItems;
  const { data: catalogItemsData } = useSelector(selector);
  const {
    data: topCategoriesData,
    loading: topCategoriesLoading,
    error: topCategoriesError,
  } = useSelector((state) => state.topCategories);
  const {
    data: availableFiltersData,
    loading: availableFiltersLoading,
    error: availableFiltersError,
  } = useSelector((state) => state.availableFilters);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const params = new URLSearchParams(location.search);

  const filtersFromParams = () => {
    const filters = {
      o: params.get('o') || DEFAULT_ORDERING_VALUE,
    };

    for (const [p, v] of params) {
      if (['category', 'page', 'q', 'o'].includes(p)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (p in filters) {
        if (Array.isArray(filters[p])) {
          filters[p].push(v);
        } else {
          filters[p] = [filters[p], v];
        }
      } else {
        filters[p] = v;
      }
    }

    return filters;
  };

  const currentPage = Math.max(parseInt(params.get('page') || '1', 10), 1);
  const { cat } = useParams();
  const nowCategory = extractCategoryId(cat);
  const query = params.get('q');
  const paramFilters = filtersFromParams();

  const extractCategories = () => {
    if (
      topCategoriesError ||
      topCategoriesLoading ||
      !Array.isArray(topCategoriesData.results)
    )
      return [];

    const data = [...topCategoriesData.results];
    for (const c of topCategoriesData.results) {
      data.push(...c.children);
    }
    return data;
  };
  const allCategories = extractCategories();

  const extractNowCategoryChildren = () => {
    const category = allCategories.find((c) => c.id.toString() === nowCategory);
    if (!category) return [];
    return category.children;
  };

  const categories = nowCategory
    ? [nowCategory, ...extractNowCategoryChildren().map((c) => c.id)]
    : [];

  const pageInfo = new CatalogPageInfo({
    itemsCount: catalogItemsData.count,
    currentPage,
    categories,
    query,
    filters: paramFilters,
  });

  const extractCategoryName = (categoryId) => {
    const info = allCategories.find((c) => c.id.toString() === categoryId);
    if (!info) return null;
    return info.name;
  };

  const categoriesString = topCategoriesData.results
    ? pageInfo.categories
        .map(extractCategoryName)
        .filter((c) => c !== null)
        .join(' | ')
    : '';

  const oneCategory =
    pageInfo.categories.length === 1 ? pageInfo.categories[0] : null;

  const extractBrands = () => {
    if (!Array.isArray(availableFiltersData)) return [];
    const brandFilter = availableFiltersData.find(
      (f) => f.param_key === 'brend'
    );
    if (!brandFilter) return [];
    return brandFilter.data;
  };
  const brands = params.has('brend') ? [] : extractBrands();

  const [filters, setFilters] = useState(paramFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const requestData = () => {
    return actionCreators.catalogItems.request(pageInfo);
  };

  const requestFilters = () => {
    dispatch(actionCreators.availableFilters.request(oneCategory));
  };

  useEffect(() => {
    setFilters(paramFilters);
    dispatch(requestData());
  }, [location]);

  useEffect(() => {
    const updatedFilters = {
      ...filters,
      ...pageInfo.filters,
      stock: true.toString(),
    };
    delete updatedFilters.brend;

    setFilters(updatedFilters);
    const currentParams = pageInfo
      .updatePageInfo({
        filters: updatedFilters,
        currentPage: 1,
      })
      .toFrontendUrlParams()
      .toString();
    history.push(`?${currentParams}`);
  }, [cat]);

  useEffect(requestFilters, [oneCategory]);

  const makeFilterChoice = (filterInfo) => {
    const valToArray = (val) => {
      if (!Array.isArray(val)) {
        return [val];
      }
      return val;
    };

    const checkboxes = filterInfo.data.map((v) => (
      <CheckBox
        key={v.id}
        id={v.id}
        checked={valToArray(filters[filterInfo.param_key] || []).includes(
          v.id.toString()
        )}
        onChange={(e) => {
          let selectedVariants = valToArray(
            filters[filterInfo.param_key] || []
          );
          const stringId = v.id.toString();
          if (e.target.checked) {
            selectedVariants = [...selectedVariants, stringId];
          } else {
            selectedVariants = selectedVariants.filter((sv) => sv !== stringId);
          }
          setFilters({
            ...filters,
            [filterInfo.param_key]: selectedVariants,
          });
        }}
      >
        {v.option}
      </CheckBox>
    ));

    return (
      <div className="filter__common filter__choice">
        {checkboxes.length > 5 ? (
          <Scrollbar autoHeight autoHeightMin={0} autoHeightMax={200}>
            {checkboxes}
          </Scrollbar>
        ) : (
          checkboxes
        )}
      </div>
    );
  };

  const makeFilterBool = (filterInfo) => {
    return (
      <div className="filter__common filter__bool">
        <RadioCheckBox
          name={filterInfo.name}
          value="true"
          checked={filters[filterInfo.param_key] === true.toString()}
          onChange={() =>
            setFilters({ ...filters, [filterInfo.param_key]: true.toString() })
          }
        >
          Да
        </RadioCheckBox>
        <RadioCheckBox
          name={filterInfo.name}
          value="false"
          checked={filters[filterInfo.param_key] === false.toString()}
          onChange={() =>
            setFilters({ ...filters, [filterInfo.param_key]: false.toString() })
          }
        >
          Нет
        </RadioCheckBox>
        <RadioCheckBox
          name={filterInfo.name}
          value="skip"
          checked={
            filters[filterInfo.param_key] !== false &&
            !filters[filterInfo.param_key]
          }
          onChange={() =>
            setFilters({ ...filters, [filterInfo.param_key]: null })
          }
        >
          Не важно
        </RadioCheckBox>
      </div>
    );
  };

  const makeFilterMinmax = (filterInfo) => {
    const replacer = (val) => filterInfo.param_key.replace('{}', val);

    return (
      <div className="filter__common filter__minmax">
        <span>от</span>
        <TextInput
          placeholder={filterInfo.data.min}
          type="number"
          min={filterInfo.data.min}
          max={filterInfo.data.max}
          value={filters[replacer('min')] || ''}
          onChange={(e) =>
            setFilters({
              ...filters,
              [replacer('min')]: e.currentTarget.value || null,
            })
          }
        />
        <span>до</span>
        <TextInput
          placeholder={filterInfo.data.max}
          type="number"
          min={filterInfo.data.min}
          max={filterInfo.data.max}
          value={filters[replacer('max')] || ''}
          onChange={(e) => {
            setFilters({
              ...filters,
              [replacer('max')]: e.target.value || null,
            });
          }}
        />
      </div>
    );
  };

  const FILTER_RENDERS = {
    choice: makeFilterChoice,
    bool: makeFilterBool,
    minmax: makeFilterMinmax,
  };

  const makeFilter = (filterInfo) => {
    return FILTER_RENDERS[filterInfo.type](filterInfo);
  };

  const onApplyFilter = ({ specifiedFilters }) => {
    const actualFilters = specifiedFilters || filters;
    const currentParams = pageInfo
      .updatePageInfo({ filters: actualFilters, currentPage: 1 })
      .toFrontendUrlParams()
      .toString();
    setFilters(actualFilters);
    history.push(`?${currentParams}`);
    setFiltersOpen(false);
  };

  const onClearFilter = () => {
    onApplyFilter({
      specifiedFilters: {
        o: DEFAULT_ORDERING_VALUE,
      },
    });
  };

  const makeOrderingItem = ({ value, text }) => {
    return (
      <RadioCheckBox
        key={value}
        name="ordering"
        value={value}
        checked={filters.o === value}
        onChange={() =>
          setFilters({
            ...filters,
            o: value,
          })
        }
      >
        {text}
      </RadioCheckBox>
    );
  };

  const makeFiltersPanel = () => {
    return (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 1.6,
          }}
          className="catalog__body__filters__container"
          style={filtersOpen ? { display: 'flex' } : {}}
        >
          <div className="catalog__body__filters__items">
            {[
              {
                text: 'Сортировать',
                content: (
                  <div className="filter__common filter__choice">
                    {[
                      { value: '-stats', text: 'По популярности' },
                      {
                        value: '-stockrecords__price',
                        text: 'По убыванию цены',
                      },
                      {
                        value: 'stockrecords__price',
                        text: 'По возрастанию цены',
                      },
                      { value: 'title', text: 'По названию' },
                    ].map(makeOrderingItem)}
                  </div>
                ),
              },
              ...availableFiltersData.map((f) => {
                return { text: f.name, content: makeFilter(f) };
              }),
            ].map((f) => (
              <PopoverMenu
                key={f.text}
                buttonClass="catalog__body__filters__items__item"
                buttonActiveClass="active"
                buttonContentJsx={
                  <>
                    {f.text}
                    <div className="catalog__body__filters__items__item__arrow" />
                  </>
                }
              >
                {f.content}
              </PopoverMenu>
            ))}
          </div>

          <div className="catalog__body__filters__controls">
            <Button onClick={onApplyFilter}>Применить фильтр</Button>

            <div
              className="catalog__body__filters__controls__clear"
              onClick={onClearFilter}
            >
              Сбросить фильтр
            </div>
          </div>
        </motion.div>
      </>
    );
  };

  const pagination = () => {
    const pages = [];
    for (
      let number = Math.max(pageInfo.currentPage - COUNT_NEXT_PREV_PAGES, 1);
      number <=
      Math.min(
        pageInfo.currentPage + COUNT_NEXT_PREV_PAGES,
        pageInfo.pagesCount
      );
      number += 1
    ) {
      pages.push(
        <Link
          key={number}
          className={`catalog__body__nav__item${
            pageInfo.currentPage === number ? ' pagination-active' : ''
          }`}
          to={{
            pathname: location.pathname,
            search: pageInfo.otherPage(number).toFrontendUrlParams().toString(),
          }}
        >
          {number}
        </Link>
      );
    }
    return pages;
  };

  const loginForAccess = () => (
    <>
      Показаны не все товары.<RawHtml className="simple-space">&nbsp;</RawHtml>
      <SoftLink
        to={{
          pathname: routes.login.to,
          search: new URLSearchParams({
            next: `${location.pathname}${location.search}`,
          }).toString(),
        }}
        className="custom-link bold"
      >
        Войдите
      </SoftLink>
      , чтобы увидеть все товары.
    </>
  );

  const paginationJsx = pagination();

  return (
    <TitledPage
      titleJsx={
        pageInfo.query
          ? `Поиск: ${pageInfo.query}`
          : categoriesString || 'Каталог'
      }
      containerData={{ className: 'catalog__body' }}
    >
      {brands.length > 0 && (
        <div className="catalog__body__brands">
          <ToggleDataList
            count={6}
            persistentContainerData={{
              className: 'catalog__body__brands__persistent',
            }}
            hiddenContainerData={{
              className: 'catalog__body__brands__hidden',
            }}
            buttonData={{
              className: 'catalog__body__brands__button',
            }}
            defaultOpen={true}
          >
            {brands
              .sort((a, b) => {
                if (a.option < b.option) {
                  return -1;
                }
                if (a.option > b.option) {
                  return 1;
                }
                return 0;
              })
              .map((b) => (
                <SoftLink
                  key={b.id}
                  className="catalog__body__brands__card"
                  to={{
                    pathname: location.pathname,
                    search: new URLSearchParams({
                      category: oneCategory || '',
                      brend: b.id,
                      stock: true.toString(),
                    }).toString(),
                  }}
                >
                  <div className="catalog__body__brands__card__container">
                    <img
                      src={`/static/brands/${b.option.toLowerCase()}.png`}
                      onError={(e) => {
                        if (!e.target.src.endsWith('/static/brands/hoob.png')) {
                          e.target.src = '/static/brands/hoob.png';
                        }
                      }}
                    />
                  </div>
                  <div>{b.option}</div>
                </SoftLink>
              ))}
          </ToggleDataList>
        </div>
      )}

      <div className="catalog__body__filters">
        {availableFiltersLoading && <Loading />}
        {availableFiltersError && (
          <ErrorRetryBox
            handleRetry={requestFilters}
            msg={availableFiltersError.message}
          />
        )}
        {!availableFiltersLoading &&
          !availableFiltersError &&
          availableFiltersData &&
          Array.isArray(availableFiltersData) &&
          makeFiltersPanel()}
        <button
          className="catalog__body__filters__open"
          style={{ width: '100%' }}
          onClick={() => setFiltersOpen(true)}
        >
          Фильтры
          <div className="catalog__body__filters__items__item__arrow" />
        </button>
      </div>

      <LoadablePage selector={selector} request={requestData}>
        {catalogItemsData.hidden_products && (
          <div className="catalog__body__access-message">
            {loginForAccess()}
          </div>
        )}

        <div className="catalog__body__items">
          {catalogItemsData.count > 0 &&
            catalogItemsData.results.map((data, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.4,
                  duration: 1.6,
                }}
                key={data.id}
                className="catalog__body__items__item"
              >
                <ProductCard data={data} categoryId={cat} />
              </motion.div>
            ))}
          {catalogItemsData.count === 0 && (
            <div className="catalog__body__items__nothing">
              К сожалению, нечего показать.
            </div>
          )}
        </div>

        {paginationJsx.length > 0 && (
          <div className="catalog__body__nav">{paginationJsx}</div>
        )}
      </LoadablePage>
    </TitledPage>
  );
}
