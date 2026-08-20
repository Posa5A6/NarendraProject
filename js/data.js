const SITE={
 name:'Hotel Rajshri',
 tagline:'Shruthi Pure Veg. A/C Restaurant',
 address:'Railway Station Road, HBG Nagar, Adoni, Andhra Pradesh 518301',
 phone:'+91 99594 61888', phoneVerified:true,
 coords:{lat:15.6214563,lng:77.2754197},
 maps:'https://www.google.com/maps/dir/?api=1&destination=15.6214563%2C77.2754197',
 timings:[['Breakfast','8:00 AM – 11:00 AM'],['Lunch','12:30 PM – 3:00 PM'],['Dinner','7:30 PM – 10:00 PM']],
 logo:'assets/logo-cropped.png'
};

const IMAGE_LIBRARY={
 breakfast:{src:'https://images.pexels.com/photos/35539315/pexels-photo-35539315.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://www.pexels.com/photo/traditional-south-indian-breakfast-spread-35539315/'},
 dosa:{src:'https://images.pexels.com/photos/28107046/pexels-photo-28107046.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://www.pexels.com/photo/dosa-28107046/'},
 paneer:{src:'https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://www.pexels.com/photo/paneer-butter-masala-9609838/'},
  starter:{src:'https://images.pexels.com/photos/3928854/pexels-photo-3928854.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://www.pexels.com/photo/food-on-a-plate-3928854/'},
  gobi:{src:'https://coox-new.s3.ap-south-1.amazonaws.com/images/d/dishes/Gobi%20Manchurian-2-dish-img.jpeg?v=1734069290001',link:'https://www.coox.in/dish/gobi-manchurian-2'},
 rice:{src:'https://images.pexels.com/photos/9609859/pexels-photo-9609859.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://www.pexels.com/photo/rice-with-meat-and-bowls-with-sauces-9609859/'},
 roti:{src:'https://images.pexels.com/photos/EGNB5qZfscw/pexels-photo-EGNB5qZfscw.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://unsplash.com/photos/cooked-roti-dish-EGNB5qZfscw'},
 thali:{src:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=480&q=72',link:'https://unsplash.com/s/photos/indian-thali'},
 dessert:{src:'https://images.pexels.com/photos/9198596/pexels-photo-9198596.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://www.pexels.com/photo/close-up-photo-of-an-indian-food-9198596/'},
 curry:{src:'https://images.pexels.com/photos/12737816/pexels-photo-12737816.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://www.pexels.com/photo/delicious-spicy-meal-12737816/'},
 noodles:{src:'https://images.pexels.com/photos/7166541/pexels-photo-7166541.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://www.pexels.com/photo/oriental-dish-with-noodles-and-chicken-7166541/'},
 soup:{src:'https://images.pexels.com/photos/5127316/pexels-photo-5127316.jpeg?auto=compress&cs=tinysrgb&w=480',link:'https://www.pexels.com/photo/soup-and-bread-5127316/'},
};

const MENU=[
['Breakfast','Idly',32.50,'breakfast'],['Breakfast','Vada',39,'breakfast'],['Breakfast','Upma',58.50,'breakfast'],['Breakfast','Pongal',65,'breakfast'],['Breakfast','Kesari Bath',65,'breakfast'],['Breakfast','Chow Chow Bath',107,'breakfast'],['Breakfast','Poori',91,'breakfast'],['Breakfast','Plain Dosa',71,'dosa'],['Breakfast','Masala Dosa',91,'dosa'],['Breakfast','Set Dosa',97.50,'dosa'],['Breakfast','Special Dosa',104.50,'dosa'],['Breakfast','Onion Dosa',107,'dosa'],['Breakfast','Uttappa',107,'dosa'],
['Soups','Tomato Soup',126,'soup'],['Soups','Hot & Sour Soup',140,'soup'],['Soups','Manchow Soup',140,'soup'],['Soups','Garlic Soup',126,'soup'],
['Starters','Gobi Manchurian',245,'gobi'],['Starters','Veg Manchurian',315,'starter'],['Starters','Mushroom Manchurian',315,'starter'],['Starters','Paneer Manchurian',315,'starter'],['Starters','Mushroom Chilly',315,'starter'],['Starters','Babycorn Chilly',315,'starter'],['Starters','Paneer Chilly',315,'starter'],['Starters','Cheese Manchurian',350,'starter'],['Starters','Babycorn Manchurian',315,'starter'],['Starters','Gobi Chilly',315,'starter'],['Starters','Gobi 65',315,'starter'],['Starters','Paneer 65',315,'starter'],['Starters','Paneer Pepper',315,'starter'],['Starters','Mushroom Manchurian',315,'starter'],['Starters','Babycorn Pepper',315,'starter'],
['Meals','Plate Meals',154,'thali'],['Meals','South Indian Thali',245,'thali'],['Meals','North Indian Thali',385,'thali'],
['Roti','Roti',42,'roti'],['Roti','Pudina Roti',42,'roti'],['Roti','Methi Roti',42,'roti'],['Roti','Onion Roti',42,'roti'],['Roti','Butter Roti',56,'roti'],['Roti','Naan',56,'roti'],['Roti','Kulcha',56,'roti'],['Roti','Butter Kulcha',70,'roti'],['Roti','Butter Naan',70,'roti'],['Roti','Paratha',56,'roti'],
['Dal','Dal Fry',154,'curry'],['Dal','Dal Tadka',182,'curry'],['Dal','Chilly Fry',70,'curry'],
['North Indian Curries','Aloo Gobi',230,'curry'],['North Indian Curries','Aloo Palak',230,'curry'],['North Indian Curries','Aloo Tomato',230,'curry'],['North Indian Curries','Aloo Capsicum',315,'curry'],['North Indian Curries','Plain Palak',230,'curry'],['North Indian Curries','Tomato Curry',315,'curry'],['North Indian Curries','Mix Veg Curry',315,'curry'],['North Indian Curries','Veg Tadka',315,'curry'],['North Indian Curries','Mutter Kaju',350,'curry'],['North Indian Curries','Green Pease Masala',315,'curry'],['North Indian Curries','Capsicum Masala',315,'curry'],['North Indian Curries','Palak Paneer',336,'paneer'],['North Indian Curries','Mix Veg Palak',336,'curry'],['North Indian Curries','Kaju Garlic',406,'paneer'],['North Indian Curries','Veg Kolhapuri',385,'curry'],['North Indian Curries','Veg Veghavar',364,'curry'],['North Indian Curries','Veg Shahi Kurma',385,'curry'],['North Indian Curries','Pudina Paneer',385,'paneer'],['North Indian Curries','Paneer Butter Masala',364,'paneer'],['North Indian Curries','Mutter Paneer',364,'paneer'],['North Indian Curries','Kaju Mushroom',406,'paneer'],['North Indian Curries','Paneer Shahi Kurma',385,'paneer'],['North Indian Curries','Paneer Bhurji',385,'paneer'],['North Indian Curries','Malai Kofta',406,'curry'],['North Indian Curries','Mushroom Masala',365,'curry'],['North Indian Curries','Paneer Kofta',406,'paneer'],['North Indian Curries','Paneer Muntaz',406,'paneer'],['North Indian Curries','Paneer Tikka Masala',406,'paneer'],['North Indian Curries','Kaju Kurma',406,'paneer'],['North Indian Curries','Kaju Paneer',406,'paneer'],['North Indian Curries','Veg Kadai',406,'curry'],['North Indian Curries','Paneer Handi',406,'paneer'],['North Indian Curries','Mushroom Handi',406,'curry'],['North Indian Curries','Kadai Mushroom',406,'curry'],['North Indian Curries','Kadai Paneer',406,'paneer'],['North Indian Curries','Achari Paneer',406,'paneer'],['North Indian Curries','Methi Chaman',386,'curry'],
['Curd & Raita','Mix Raita',84,'thali'],['Curd & Raita','Aloo Raita',84,'thali'],['Curd & Raita','Tomato Raita',84,'thali'],
['Rice','Plain Rice',56,'rice'],['Rice','Curd Rice',70,'rice'],['Rice','SPL Curd Rice',84,'rice'],['Rice','Tomato Rice',196,'rice'],['Rice','Veg Pulav',196,'rice'],['Rice','Peas Pulav',210,'rice'],['Rice','Veg Biryani',224,'rice'],['Rice','Ghee Rice',224,'rice'],['Rice','Jeera Rice',224,'rice'],['Rice','Paneer Pulao',294,'rice'],['Rice','Hyderabadi Biryani',294,'rice'],['Rice','Mushroom Pulao',294,'rice'],['Rice','Handi Pulao',294,'rice'],['Rice','Dal Khichdi',294,'rice'],
['Fried Rice','Veg Fried Rice',252,'rice'],['Fried Rice','Mix Fried Rice',294,'rice'],['Fried Rice','Gobi Fried Rice',294,'rice'],['Fried Rice','Mushroom Fried Rice',294,'rice'],['Fried Rice','Paneer Fried Rice',294,'rice'],['Fried Rice','Schezwan Fried Rice',336,'rice'],['Fried Rice','Kaju Fried Rice',350,'rice'],
['Noodles','Noodle with Fried Rice',252,'noodles'],['Noodles','Veg Soft Noodles',182,'noodles'],['Noodles','Veg Hakka Noodles',210,'noodles'],['Noodles','Chilly Garlic Noodles',266,'noodles'],
['Desserts','Gulab Jamun',42,'dessert'],['Desserts','Basundi',49,'dessert']
];

function getMenu(){
 try{const saved=JSON.parse(localStorage.getItem('rajshri-menu-v2'));return Array.isArray(saved)&&saved.length?saved:MENU.map(x=>({category:x[0],name:x[1],price:x[2],image:x[3]}));}catch{return MENU.map(x=>({category:x[0],name:x[1],price:x[2],image:x[3]}))}
}
function saveMenu(items){localStorage.setItem('rajshri-menu-v2',JSON.stringify(items));}
function resetMenu(){localStorage.removeItem('rajshri-menu-v2');location.reload();}
