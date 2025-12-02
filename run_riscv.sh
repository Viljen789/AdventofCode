
AS=riscv64-unknown-elf-as
LD=riscv64-unknown-elf-ld

# ... (lines above)

SOURCE_FILE=$1

# --- ADD THESE DEBUG LINES ---
echo "DEBUG: My current folder is: $(pwd)"
echo "DEBUG: I am trying to find file: '$SOURCE_FILE'"
ls -l "$SOURCE_FILE"
# -----------------------------
#
BASENAME=$(basename "$SOURCE_FILE" .s)
OBJ_FILE="${BASENAME}.o"
EXE_FILE="${BASENAME}"

echo "[1/3] Assembling $SOURCE_FILE..."
$AS -o $OBJ_FILE "$SOURCE_FILE"

if [ $? -ne 0 ]; then
    echo "Assembly failed."
    exit 1
fi

echo "[2/3] Linking..."
$LD -o $EXE_FILE $OBJ_FILE

echo "[3/3] Running..."
echo "--------------------------------"
qemu-riscv64 $EXE_FILE
EXIT_CODE=$?
echo -e "\n--------------------------------"

rm $OBJ_FILE $EXE_FILE

echo "Done with exit code $EXIT_CODE"
