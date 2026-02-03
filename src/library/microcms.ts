import { recommendItems as localItems } from '../data/items';

// 型定義
export type MicroCMSImage = {
    url: string;
    height: number;
    width: number;
};

export type Item = {
    id: string;
    title: string;
    description: string;
    image: string | null;
    links: {
        amazon?: string;
        rakuten?: string;
        yahoo?: string;
    };
};

// MicroCMSのレスポンス型
type MicroCMSResponse = {
    contents: {
        id: string;
        title: string;
        description: string;
        image?: MicroCMSImage;
        amazonLink?: string;
        rakutenLink?: string;
        yahooLink?: string;
    }[];
    totalCount: number;
    offset: number;
    limit: number;
};

// 環境変数
const MICROCMS_SERVICE_DOMAIN = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const MICROCMS_API_KEY = import.meta.env.MICROCMS_API_KEY;

// データ取得関数
export const getRecommendItems = async (): Promise<Item[]> => {
    // 環境変数が設定されていない場合はローカルデータを返す（フォールバック）
    if (!MICROCMS_SERVICE_DOMAIN || !MICROCMS_API_KEY) {
        console.log('MicroCMS credentials not found. Using local data.');
        return localItems;
    }

    try {
        const response = await fetch(
            `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/items`,
            {
                headers: {
                    'X-MICROCMS-API-KEY': MICROCMS_API_KEY,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch data from MicroCMS: ${response.statusText}`);
        }

        const data: MicroCMSResponse = await response.json();

        // アプリケーション内で使いやすい形に変換
        return data.contents.map((content) => ({
            id: content.id,
            title: content.title,
            description: content.description,
            image: content.image?.url || null, // 画像がない場合はnull
            links: {
                amazon: content.amazonLink,
                rakuten: content.rakutenLink,
                yahoo: content.yahooLink,
            },
        }));
    } catch (error) {
        console.error('Error fetching data from MicroCMS:', error);
        // エラー時はローカルデータを返す（サイトを落とさないため）
        return localItems;
    }
};
