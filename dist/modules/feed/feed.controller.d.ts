import { FeedService } from './feed.service';
export declare class FeedController {
    private readonly feedService;
    constructor(feedService: FeedService);
    privateFeeds(res: any): Promise<any>;
}
