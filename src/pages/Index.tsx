import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Choice {
  text: string;
  affectionChange: number;
}

interface DialogueNode {
  id: number;
  character: string;
  text: string;
  image: string;
  choices?: Choice[];
}

const Index = () => {
  const [currentDialogue, setCurrentDialogue] = useState(0);
  const [affection, setAffection] = useState(30);
  const [suspicion, setSuspicion] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [showChoices, setShowChoices] = useState(false);

  const dialogues: DialogueNode[] = [
    {
      id: 0,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: 'Ваше величество... Вы снова работаете всю ночь. Прошу вас, отдохните. Я так беспокоюсь о вашем здоровье.',
      choices: [
        { text: 'Ты прав, Аффогато. Я устал.', affectionChange: 20 },
        { text: 'Королевство важнее моего отдыха.', affectionChange: 5 },
        { text: 'Не вмешивайся в мои дела.', affectionChange: -15 }
      ]
    },
    {
      id: 1,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b5687c84-913a-4a63-986c-458a60475161.jpg',
      text: '*вздыхает* Метель усиливается. Границы нуждаются в укреплении, а я здесь...',
      choices: [
        { text: 'Позволить Аффогато помочь', affectionChange: 15 },
        { text: 'Справлюсь сам', affectionChange: -5 }
      ]
    },
    {
      id: 2,
      character: 'Генерал',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/9e1c5a2e-8e15-4998-9bd2-70b515dfa2de.jpg',
      text: 'Ваше величество! У меня есть план по укреплению обороны. Если позволите, я хотел бы обсудить его с вами наедине.',
      choices: [
        { text: 'Давай обсудим это сейчас.', affectionChange: -15 },
        { text: 'Аффогато тоже должен это услышать.', affectionChange: 10 },
        { text: 'Приходи позже, генерал.', affectionChange: 5 }
      ]
    },
    {
      id: 3,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*появляется из тени* Я слышал разговор с генералом. *холодная улыбка* Не доверяйте ему, ваше величество. Некоторые из военных совета... не так преданны, как кажется.',
      choices: [
        { text: 'Ты всегда защищаешь меня...', affectionChange: 20 },
        { text: 'А ты откуда знаешь об этом?', affectionChange: -20 },
        { text: 'Генерал служит верой и правдой.', affectionChange: -15 }
      ]
    },
    {
      id: 4,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b5687c84-913a-4a63-986c-458a60475161.jpg',
      text: '*устало снимает доспехи после долгого дня* Мне нужно принять ванну... Слуги могут уйти, я справлюсь сам.',
      choices: [
        { text: 'Пойти в ванную комнату', affectionChange: 0 }
      ]
    },
    {
      id: 5,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*мягко входит в ванную* Ваше величество, позвольте мне помочь вам. *улыбается* Вы так устали, что даже руки дрожат. Я уже приготовил воду с травами для расслабления.',
      choices: [
        { text: 'Аффогато, я не просил тебя...', affectionChange: -10 },
        { text: 'Хорошо, спасибо за заботу.', affectionChange: 20 },
        { text: '*промолчать*', affectionChange: 10 }
      ]
    },
    {
      id: 6,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*осторожно моет спину короля* Ваше величество... я заметил, что служанка сегодня смотрела на вас. *голос становится холоднее* Я уже позаботился о том, чтобы её перевели в дальнее крыло замка.',
      choices: [
        { text: 'Зачем ты это сделал?', affectionChange: -20 },
        { text: 'Ты слишком много берёшь на себя.', affectionChange: -15 },
        { text: '*не сказать ничего*', affectionChange: 15 }
      ]
    },
    {
      id: 7,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b5687c84-913a-4a63-986c-458a60475161.jpg',
      text: '*напряжённо* Аффогато... Это была просто служанка, выполняющая свои обязанности. Почему ты так реагируешь на каждого, кто приближается ко мне?',
      choices: [
        { text: 'Потребовать объяснений', affectionChange: -25 },
        { text: 'Оставить этот разговор', affectionChange: 5 }
      ]
    },
    {
      id: 8,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*его руки замирают, голос дрожит* Потому что... они не достойны даже смотреть на вас. *шёпот* Только я. С того дня, как впервые увидел вас... я понял, что должен защищать вас от всех. От каждого взгляда, от каждого прикосновения... которое не моё.',
      choices: [
        { text: 'Аффогато, это нездорово...', affectionChange: -30 },
        { text: '*почувствовать страх*', affectionChange: -25 },
        { text: 'Я понимаю твою преданность.', affectionChange: 25 }
      ]
    },
    {
      id: 9,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b5687c84-913a-4a63-986c-458a60475161.jpg',
      text: '*смотрит в окно на метель* Аффогато, как долго ты уже служишь мне? Иногда мне кажется, что ты знаешь обо мне больше, чем я сам...',
      choices: [
        { text: 'Это успокаивает.', affectionChange: 15 },
        { text: 'Это... тревожит.', affectionChange: -25 }
      ]
    },
    {
      id: 10,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/51c94e5c-a2cf-4aea-82d5-83d785bed9ca.jpg',
      text: '*выходит в королевский двор* Мне нужно подышать свежим воздухом. Этот замок иногда душит меня своими стенами... *смотрит на заснеженные сады*',
      choices: [
        { text: 'Прогуляться одному', affectionChange: -15 },
        { text: 'Позвать Аффогато с собой', affectionChange: 20 }
      ]
    },
    {
      id: 11,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*неожиданно появляется рядом* Ваше величество, я уже здесь. *мягко улыбается* Я всегда чувствую, когда вы нуждаетесь в компании. Сад прекрасен в это время, не правда ли?',
      choices: [
        { text: 'Как ты узнал, что я здесь?', affectionChange: -20 },
        { text: 'Да, очень красиво.', affectionChange: 15 },
        { text: 'Я хотел побыть один...', affectionChange: -15 }
      ]
    },
    {
      id: 12,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/51c94e5c-a2cf-4aea-82d5-83d785bed9ca.jpg',
      text: '*замечает, что вокруг никого* Аффогато... где все придворные? Обычно в это время здесь много народу.',
      choices: [
        { text: 'Спросить об этом', affectionChange: -10 }
      ]
    },
    {
      id: 13,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*невинно* О, я просто попросил стражу не пускать никого в сад на ближайший час. *приближается* Подумал, что вам нужен покой. Только мы двое, ваше величество. Разве не этого вы хотели?',
      choices: [
        { text: 'Я не давал такого приказа!', affectionChange: -25 },
        { text: 'Ты всегда обо мне заботишься...', affectionChange: 20 },
        { text: '*почувствовать тревогу*', affectionChange: -20 }
      ]
    },
    {
      id: 14,
      character: 'Генерал',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/9e1c5a2e-8e15-4998-9bd2-70b515dfa2de.jpg',
      text: '*появляется издалека, спешит к королю* Ваше величество! Простите, что прерываю, но срочное донесение с границы! *замечает Аффогато и останавливается*',
      choices: [
        { text: 'Подойди, генерал. Что случилось?', affectionChange: -15 },
        { text: 'Не сейчас, я занят.', affectionChange: 15 }
      ]
    },
    {
      id: 15,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*холодно смотрит на генерала* Я ведь просил стражу никого не пускать... *поворачивается к королю с улыбкой* Ваше величество, может, генерал подождёт? Мы так редко проводим время вместе...',
      choices: [
        { text: 'Дела королевства важнее.', affectionChange: -20 },
        { text: 'Генерал, подожди в тронном зале.', affectionChange: 20 },
        { text: 'Аффогато, хватит контролировать всё!', affectionChange: -30 }
      ]
    },
    {
      id: 16,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/51c94e5c-a2cf-4aea-82d5-83d785bed9ca.jpg',
      text: '*замечает, что метель усилилась* Аффогато, мы уже давно на улице. Мороз становится сильнее. *смотрит на советника* Ты дрожишь... Твоё ханьфу не предназначено для такого холода.',
      choices: [
        { text: 'Вернёмся в замок немедленно.', affectionChange: 15 },
        { text: 'Ещё немного погуляем.', affectionChange: -10 },
        { text: 'Ты должен был одеться теплее.', affectionChange: 5 }
      ]
    },
    {
      id: 17,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*улыбается, явно замерзая* Всё в порядке, ваше величество. *голос дрожит от холода* Я могу вынести любой мороз, если это значит провести больше времени с вами... *кашляет*',
      choices: [
        { text: 'Хватит! Идём внутрь сейчас же!', affectionChange: 20 },
        { text: 'Если ты настаиваешь...', affectionChange: -15 }
      ]
    },
    {
      id: 18,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/62837394-eecf-4659-8110-84cb6b9f4476.jpg',
      text: '*на следующий день, в тронном зале* Где Аффогато? Он обычно всегда здесь к этому времени... *беспокойство*',
      choices: [
        { text: 'Послать слугу проверить его', affectionChange: 15 }
      ]
    },
    {
      id: 19,
      character: 'Слуга',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/9e1c5a2e-8e15-4998-9bd2-70b515dfa2de.jpg',
      text: '*входит встревоженный* Ваше величество! Советник Аффогато... он серьёзно заболел. Лихорадка и кашель. Лекарь говорит, что он простудился на морозе. Советник отказывается лежать в постели и всё время спрашивает о вас...',
      choices: [
        { text: 'Немедленно иду к нему!', affectionChange: 25 },
        { text: 'Пусть лекарь продолжит лечение.', affectionChange: -20 },
        { text: 'Это моя вина...', affectionChange: 20 }
      ]
    },
    {
      id: 20,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/26c4062a-9575-45b4-af0c-0757f70ab379.jpg',
      text: '*лежит в постели, бледный и слабый* Ваше величество... *пытается встать* Простите, что не пришёл... Я не хотел, чтобы вы видели меня таким... *сильный кашель*',
      choices: [
        { text: 'Лежи! Не вставай!', affectionChange: 20 },
        { text: 'Почему ты не сказал, что замерзаешь?', affectionChange: 15 },
        { text: '*сесть рядом с ним*', affectionChange: 25 }
      ]
    },
    {
      id: 21,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/26c4062a-9575-45b4-af0c-0757f70ab379.jpg',
      text: '*слабо улыбается* Потому что... каждая секунда рядом с вами стоит любой цены. *берёт руку короля* Даже если бы я замёрз насмерть в том саду... я был бы счастлив, зная, что провёл это время с вами.',
      choices: [
        { text: 'Не говори так... отдыхай.', affectionChange: 20 },
        { text: 'Ты слишком много жертвуешь.', affectionChange: 15 },
        { text: '*остаться с ним до выздоровления*', affectionChange: 30 }
      ]
    },
    {
      id: 22,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/b5687c84-913a-4a63-986c-458a60475161.jpg',
      text: '*несколько дней спустя* Аффогато выздоравливает, но теперь я понимаю... он действительно готов на всё ради меня. *задумчиво* Это преданность или... что-то большее?',
      choices: [
        { text: 'Это любовь и преданность.', affectionChange: 25 },
        { text: 'Это опасная одержимость.', affectionChange: -20 }
      ]
    },
    {
      id: 30,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*его взгляд становится безумным* Всегда. Каждую ночь. *шёпотом* Я не могу спать, зная, что вы там, одни... Что если кто-то попытается навредить вам? Что если вам приснится кошмар и некому будет вас утешить? *сжимает руку короля* Только я могу защитить вас. Только я понимаю вас.',
      choices: [
        { text: 'Это безумие, Аффогато!', affectionChange: -40 },
        { text: 'Ты... заботишься обо мне.', affectionChange: 25 },
        { text: '*почувствовать ужас*', affectionChange: -35 }
      ]
    },
    {
      id: 31,
      character: 'Генерал',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/9e1c5a2e-8e15-4998-9bd2-70b515dfa2de.jpg',
      text: '*тихо* Ваше величество, я должен вам сказать... Советник Аффогато недавно отдавал приказы от вашего имени. Солдаты на границе в замешательстве. Простите мою дерзость, но это опасно.',
      choices: [
        { text: 'Я разберусь с этим.', affectionChange: -20 },
        { text: 'Аффогато действовал в моих интересах.', affectionChange: 15 },
        { text: 'Почему ты молчал раньше?', affectionChange: -10 }
      ]
    },
    {
      id: 25,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/de838e60-5b04-4398-b83d-f966f4da83f7.jpg',
      text: '*глубокая ночь, король лежит в постели* Наконец-то тишина... *закрывает глаза* Может быть, сегодня я смогу спокойно отдохнуть...',
      choices: [
        { text: 'Попытаться уснуть', affectionChange: 0 }
      ]
    },
    {
      id: 26,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/de838e60-5b04-4398-b83d-f966f4da83f7.jpg',
      text: '*слышит тихий скрип двери* ...Кто здесь? *открывает глаза и видит силуэт в лунном свете*',
      choices: [
        { text: 'Кто там?!', affectionChange: -15 },
        { text: '*наблюдать молча*', affectionChange: 5 }
      ]
    },
    {
      id: 27,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*мягко* Прошу прощения за вторжение, ваше величество. *приближается к постели* Я не мог уснуть... Всё думал о вас. Вы не можете себе представить, как сильно я переживаю за вас каждую ночь.',
      choices: [
        { text: 'Аффогато, сейчас глубокая ночь!', affectionChange: -20 },
        { text: 'Ты переживаешь обо мне?', affectionChange: 15 },
        { text: 'Как ты вообще попал сюда?', affectionChange: -25 }
      ]
    },
    {
      id: 28,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*садится на край постели* Я приходил проверить, спите ли вы спокойно. *нежно касается руки короля* Вы так часто видите кошмары... Я слышу, как вы кричите по ночам. Позвольте мне остаться рядом.',
      choices: [
        { text: 'Ты... следишь за мной по ночам?!', affectionChange: -30 },
        { text: 'Мне действительно снятся кошмары...', affectionChange: 20 },
        { text: 'Уйди немедленно!', affectionChange: -35 }
      ]
    },
    {
      id: 29,
      character: 'Дарк Какао',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/de838e60-5b04-4398-b83d-f966f4da83f7.jpg',
      text: '*напряжённо* Аффогато... как долго ты приходишь сюда по ночам? *смотрит в его глаза* И как часто ты наблюдаешь за мной, когда я не знаю об этом?',
      choices: [
        { text: 'Требовать правды', affectionChange: -25 },
        { text: 'Не хотеть знать ответ', affectionChange: 10 }
      ]
    },
    {
      id: 23,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*его взгляд становится безумным* Всегда. Каждую ночь. *шёпотом* Я не могу спать, зная, что вы там, одни... Что если кто-то попытается навредить вам? Что если вам приснится кошмар и некому будет вас утешить? *сжимает руку короля* Только я могу защитить вас. Только я понимаю вас.',
      choices: [
        { text: 'Это безумие, Аффогато!', affectionChange: -40 },
        { text: 'Ты... заботишься обо мне.', affectionChange: 25 },
        { text: '*почувствовать ужас*', affectionChange: -35 }
      ]
    },
    {
      id: 31,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*приближает лицо к королю* Скажите мне... скажите, что я нужен вам так же, как вы нужны мне. *дрожащим голосом* С того дня, как я был ребёнком и впервые увидел вас... моё сердце принадлежит только вам. Каждый вдох, каждая мысль... всё для вас.',
      choices: [
        { text: 'Ты нужен мне, Аффогато.', affectionChange: 35 },
        { text: 'Это нездоровая одержимость!', affectionChange: -40 },
        { text: 'Отойди от меня...', affectionChange: -30 }
      ]
    },
    {
      id: 32,
      character: 'Аффогато',
      image: 'https://cdn.poehali.dev/projects/bd364782-8da8-4698-9feb-714752b0aae3/files/05a74013-1534-4d28-afd5-5b13ebd1d1c2.jpg',
      text: '*его глаза горят холодным огнём* Ваше величество... Вы ведь понимаете, что я делаю всё это только для вас? *голос дрожит* Никто не должен стоять между нами. Никто. Никогда.',
      choices: [
        { text: 'Ты единственный, кому я могу доверять.', affectionChange: 30 },
        { text: 'Аффогато, ты переходишь все границы!', affectionChange: -45 }
      ]
    }
  ];

  const dialogue = dialogues[currentDialogue];

  useEffect(() => {
    setDisplayedText('');
    setIsTextComplete(false);
    setShowChoices(false);
    
    let index = 0;
    const text = dialogue.text;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTextComplete(true);
        setShowChoices(true);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentDialogue, dialogue.text]);

  const handleChoice = (choice: Choice) => {
    const newAffection = Math.max(0, Math.min(100, affection + choice.affectionChange));
    setAffection(newAffection);
    
    if (choice.affectionChange < 0) {
      setSuspicion(Math.min(100, suspicion + Math.abs(choice.affectionChange)));
    }
    
    if (currentDialogue < dialogues.length - 1) {
      setCurrentDialogue(currentDialogue + 1);
    }
  };

  const getAffectionColor = () => {
    if (affection >= 70) return 'bg-purple-600';
    if (affection >= 40) return 'bg-blue-500';
    return 'bg-slate-600';
  };

  const getAffectionLabel = () => {
    if (affection >= 80) return 'Абсолютная преданность';
    if (affection >= 60) return 'Глубокая привязанность';
    if (affection >= 40) return 'Доверие';
    if (affection >= 20) return 'Уважение';
    return 'Холодная вежливость';
  };

  const getSuspicionLabel = () => {
    if (suspicion >= 60) return 'Что-то не так...';
    if (suspicion >= 30) return 'Лёгкие сомнения';
    return 'Никаких подозрений';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-slate-900 to-slate-950 font-montserrat relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-cormorant font-semibold text-foreground mb-2">
            Королевство Тёмного Какао
          </h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <Icon name="Snowflake" size={16} />
            Визуальная новелла
            <Icon name="Snowflake" size={16} />
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-5 bg-card/80 backdrop-blur-sm border-purple-500/30 animate-scale-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="Heart" className="text-purple-400" size={20} />
                <span className="font-medium text-sm">{getAffectionLabel()}</span>
              </div>
              <span className="text-sm text-muted-foreground">{affection}%</span>
            </div>
            <Progress value={affection} className="h-2.5">
              <div className={`h-full ${getAffectionColor()} transition-all duration-500`} style={{ width: `${affection}%` }} />
            </Progress>
          </Card>
          
          <Card className="p-5 bg-card/80 backdrop-blur-sm border-blue-500/30 animate-scale-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="Eye" className="text-blue-400" size={20} />
                <span className="font-medium text-sm">{getSuspicionLabel()}</span>
              </div>
              <span className="text-sm text-muted-foreground">{suspicion}%</span>
            </div>
            <Progress value={suspicion} className="h-2.5">
              <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${suspicion}%` }} />
            </Progress>
          </Card>
        </div>

        <Card className="mb-6 bg-card/90 backdrop-blur-md border-slate-700/50 animate-scale-in shadow-2xl">
          <div className="aspect-video relative overflow-hidden rounded-t-lg">
            <img 
              src={dialogue.image}
              alt={dialogue.character}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-cormorant font-semibold text-purple-300 mb-1">
                {dialogue.character}
              </h3>
            </div>
          </div>

          <div className="p-6">
            <div className="min-h-[120px] mb-6">
              <p className="text-lg font-cormorant leading-relaxed animate-text-reveal">
                {displayedText}
                {!isTextComplete && <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse"></span>}
              </p>
            </div>

            {showChoices && dialogue.choices && (
              <div className="space-y-3">
                {dialogue.choices.map((choice, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoice(choice)}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4 px-5 border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-400/50 transition-all duration-300 group"
                  >
                    <Icon name="MessageCircle" className="mr-3 text-purple-400 group-hover:scale-110 transition-transform" size={18} />
                    <span className="font-cormorant text-base">{choice.text}</span>
                  </Button>
                ))}
              </div>
            )}

            {!dialogue.choices && isTextComplete && (
              <div className="text-center">
                <div className="mb-6 p-6 bg-slate-800/50 rounded-lg border-2 border-purple-500/30">
                  <p className="text-3xl font-cormorant text-purple-300 mb-4">
                    {affection >= 80 && suspicion < 30 ? '💜 Финал: Взаимная одержимость' : 
                     affection >= 60 && suspicion < 50 ? '❄️ Финал: Вечная преданность' :
                     affection >= 60 && suspicion >= 50 ? '⚠️ Финал: Позолоченная клетка' :
                     affection >= 30 && suspicion >= 60 ? '👁️ Финал: Побег из тени' :
                     '🖤 Финал: Изгнание советника'}
                  </p>
                  
                  <div className="space-y-3 text-left">
                    {affection >= 80 && suspicion < 30 ? (
                      <>
                        <p className="text-base text-foreground font-cormorant leading-relaxed">
                          Дарк Какао принял одержимость Аффогато и ответил взаимностью. Советник стал не просто приближённым — он стал единственным человеком, которому король доверяет полностью.
                        </p>
                        <p className="text-sm text-muted-foreground font-cormorant italic">
                          Генерал и придворные больше не имеют доступа к королю. Аффогато контролирует каждый аспект жизни Дарк Какао, но король счастлив в этих объятиях. Королевство процветает под их совместным правлением, хотя многие шепчутся о странной близости правителя и советника...
                        </p>
                        <p className="text-sm text-purple-300 font-cormorant">
                          "Мы будем вместе вечно, ваше величество. Никто и ничто не разлучит нас."
                        </p>
                      </>
                    ) : affection >= 60 && suspicion < 50 ? (
                      <>
                        <p className="text-base text-foreground font-cormorant leading-relaxed">
                          Король доверился Аффогато, приняв его преданность как искреннюю заботу. Советник остался рядом, продолжая наблюдать за каждым шагом правителя.
                        </p>
                        <p className="text-sm text-muted-foreground font-cormorant italic">
                          Дарк Какао не замечает, как постепенно отдаляется от других придворных. Аффогато мягко направляет каждое решение короля, изолируя его от внешнего мира. Генерал перестал приходить с докладами. Служанки боятся поднять глаза на короля. Но Дарк Какао чувствует себя защищённым...
                        </p>
                        <p className="text-sm text-purple-300 font-cormorant">
                          "Я всегда буду рядом, чтобы оберегать вас."
                        </p>
                      </>
                    ) : affection >= 60 && suspicion >= 50 ? (
                      <>
                        <p className="text-base text-foreground font-cormorant leading-relaxed">
                          Король понял, что поведение Аффогато ненормально, но уже слишком привязался к советнику, чтобы прогнать его. Теперь он пойман в ловушку собственных чувств.
                        </p>
                        <p className="text-sm text-muted-foreground font-cormorant italic">
                          Дарк Какао знает, что Аффогато следит за каждым его шагом, контролирует придворных, устраняет всех, кто приближается к королю. Он видит безумие в глазах советника, но не может оттолкнуть его. Страх смешался с привязанностью. Королевство медленно погружается в изоляцию под тенью их токсичных отношений...
                        </p>
                        <p className="text-sm text-purple-300 font-cormorant">
                          "Вы мой, ваше величество. И я — ваш. Навсегда."
                        </p>
                      </>
                    ) : affection >= 30 && suspicion >= 60 ? (
                      <>
                        <p className="text-base text-foreground font-cormorant leading-relaxed">
                          Дарк Какао наконец осознал опасность и решил действовать. С помощью генерала он раскрыл истинное лицо Аффогато и изгнал советника из замка.
                        </p>
                        <p className="text-sm text-muted-foreground font-cormorant italic">
                          Аффогато был отправлен в дальние земли под стражей. Но перед отъездом он прошептал: "Вы ещё пожалеете об этом, ваше величество. Никто не сможет заботиться о вас так, как я." Дарк Какао вернулся к своим обязанностям, но иногда по ночам он ловит себя на том, что оглядывается в темноту, ожидая увидеть знакомый силуэт...
                        </p>
                        <p className="text-sm text-blue-300 font-cormorant">
                          "Я буду ждать. Вы вернётесь ко мне."
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-base text-foreground font-cormorant leading-relaxed">
                          Король немедленно отстранил Аффогато от должности, почувствовав угрозу. Советник был изгнан из королевства под конвоем.
                        </p>
                        <p className="text-sm text-muted-foreground font-cormorant italic">
                          Аффогато исчез в метели, бросив последний взгляд на замок. Дарк Какао усилил охрану и вернулся к работе с другими советниками. Но странные слухи доходят до замка — некоторые путники клянутся, что видели фигуру в чёрно-фиолетовом ханьфу, наблюдающую за воротами королевства из-за деревьев...
                        </p>
                        <p className="text-sm text-slate-400 font-cormorant">
                          "Расстояние ничего не значит. Я всё ещё слежу за вами."
                        </p>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-purple-500/20">
                    <p className="text-xs text-muted-foreground">
                      Преданность: {affection}% | Подозрение: {suspicion}%
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    setCurrentDialogue(0);
                    setAffection(30);
                    setSuspicion(0);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Icon name="RotateCcw" className="mr-2" size={18} />
                  Начать заново
                </Button>
              </div>
            )}
          </div>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Info" size={16} />
            Твои выборы влияют на развитие истории и отношения между персонажами
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;