for i in $1/*.wav;

do fz=$(stat --format="%s" $i) && \

limite="30000000"

if [ $fz -gt $limite ] 
then
    echo "no convierto $($i)"
    echo $1$(basename -- "$i") >> no_convertidos.txt;
else 	
    ffmpeg -y -i $i ${i%.*}.mp3 ${i%.*}.ogg
fi

done;
