import List from "../../components/list";
import React, {useCallback} from "react";
import BasketTotal from "../../components/basket-total";
import LayoutModal from "../../components/layout-modal";
import ItemBasket from "../../components/item-basket";
import LangArr from "../../components/lang-array";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Basket(){

  console.log('Basket');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.basket.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.language.language
  }));

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => store.get('modals').close(), []),
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.get('basket').removeFromBasket(_id), [])
  };

  const renders = {
    itemBasket: useCallback(item => <ItemBasket item={item} onRemove={callbacks.removeFromBasket}/>, []),
  }

  return (
    <LayoutModal title={LangArr.basket.title[select.language]} onClose={callbacks.closeModal} lang={select.language}>
      <List items={select.items} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} lang={select.language}/>
    </LayoutModal>
  )
}

export default React.memo(Basket);
