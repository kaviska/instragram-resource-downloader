// mui icon for video
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

export default function TopHero() {
    return (
        <div className="flex css-glass px-3 py-3 rounded-[6px]">
            <a href="/video">
                <div className="flex cursor-pointer gap-2 justify-center items-center border-r border-white px-4">
                    <span className="text-white text-[18px]">Video</span>
                    <div className="hidden md:block">
                        <VideoLibraryIcon style={{ color: "white", fontSize: 18 }} />
                    </div>
                </div>
            </a>

            <a href="/photo">
                <div className="flex cursor-pointer gap-2 justify-center items-center border-r border-white px-4">
                    <span className="text-white text-[18px]">Photo</span>
                    <div className="hidden md:block">
                        <InsertPhotoIcon style={{ color: "white", fontSize: 18 }} />
                    </div>
                </div>
            </a>

            <a href="/reel">
                <div className="flex cursor-pointer gap-2 justify-center items-center border-r border-white px-4">
                    <span className="text-white text-[18px]">Reel</span>
                    <div className="hidden md:block">
                        <MovieCreationIcon style={{ color: "white", fontSize: 18 }} />
                    </div>
                </div>
            </a>

            <a href="/carousel">
                <div className="flex cursor-pointer gap-2 justify-center items-center px-4">
                    <span className="text-white text-[18px]">Carousel</span>
                    <div className="hidden md:block">
                        <ViewCarouselIcon style={{ color: "white", fontSize: 18 }} />
                    </div>
                </div>
            </a>
        </div>
    );
}
