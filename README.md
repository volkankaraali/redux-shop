### [live demo](https://redux-shopapp.netlify.app)

---
**kullanılan paketler**;
* **[tailwindcss](https://tailwindcss.com)**
* **[mantine](https://mantine.dev)**
* **[html-to-image](https://www.npmjs.com/package/html-to-image#toCanvas)**
* **[downloadjs](https://www.npmjs.com/package/downloadjs)** 
* **[redux-toolkit](https://redux-toolkit.js.org)**
* **[react-redux](https://react-redux.js.org)**

---
* ürünler products.json dan gelmekte.
* redux/shops içerisinde; products, currency ve money initialState bulunmakta.products a veriler products.json dan gelir,public klasörü içerisinde görselleri bulunmakta. currency, ekranda seçilen para birimine göre set edilir (default tl).
* redux/basket içerisinde; data,displayBill,displayBasket olarak initisalState bulunmakta. data'ya ürünler, {{product},number,currency} şeklinde eklenir.
* basket componenti içerisinde ürünler datanın içerisindeki ürünlerin currency ye göre listelenir.
* take bill butonuna tıklandıktan sonra displayBasket false set edilir, displayBill true.
* fatura hesaplandıktan sonra download butonu ile png olarak indirilebilir. 
* clear butonu ile, displayBasket true, displayBill false set edilir ve basket içerisindeki datalar silinir.
