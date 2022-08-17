import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Menu from "../../components/menu";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import { translate } from '../../utils/languages';

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load(1, 10);
  }, [])


  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalCount: state.catalog.totalCount,
    limit: state.catalog.limit,
    page: state.catalog.page
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),

    selectPage: useCallback((page) => store.get('catalog').load(page, 10), []),

    changeLanguage: useCallback((lang) => store.get('language').setLanguage(lang))
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} link={item._id}/>, []),
  }


  return (
      <Layout head={<h1>{translate('head')}</h1>} onChangeLanguage={callbacks.changeLanguage}>
        <Menu/>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        <List items={select.items} renderItem={renders.item}/>
        <Pagination count={select.totalCount} itemLimit={select.limit} currentPage={select.page} selectPage={callbacks.selectPage}/>
      </Layout>
    
  )
}

export default React.memo(Main);
